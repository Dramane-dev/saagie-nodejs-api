import axios, { AxiosInstance, AxiosPromise } from "axios";
import { AllowedAlertStatus } from "../constants";
import { generateAxiosInstance } from "../defaults/generateAxiosInstance";
import { IProject } from "../interfaces/IProject";
import crypto from "crypto";

export const backgroundTask = async (newProjectId: string, projectToDuplicate: IProject) => {
    // CREATED
    // INIT_REQUESTED
    // INITIALIZING
    // FAILED
    // READY
    let projectStatus: string = "INITIALIZING";
    const query: string = `query {
        project(id: "${newProjectId}") {
            id
            name
              status
        }
    }`;
    let axiosInstance: AxiosInstance = await generateAxiosInstance();

    do {
        await waitFor(5);
        const getStatus = await axiosInstance({
            method: "POST",
            data: {
                query,
            },
        });
        projectStatus = getStatus.data.data.project.status;
        console.log("tick", projectStatus);
    } while (projectStatus !== "READY");

    let jobMutation: string = `mutation createNewJob($job: JobInput!, $jobVersion: JobVersionInput!) {
        createJob(job: $job, jobVersion: $jobVersion) {
          id
          name
          description
          countJobInstance
          category
          isScheduled
        }
    }`;
    let appMutation: string = `mutation createNewApp($app: AppInput!) {
        createApp(app: $app) {
            id
            name
            description
            creationDate
            creator
            isGenericApp
        }
    }`;

    const calls: Array<AxiosPromise<any>> = [];
    for (let jobToDuplicate of projectToDuplicate.jobs ?? []) {
        let jobVariables: any = {
            job: {
                projectId: newProjectId,
                ...jobToDuplicate,
            },
            jobVersion: {
                ...jobToDuplicate.versions[0],
            },
        };

        delete jobVariables.job.id;
        delete jobVariables.job.countJobInstance;
        delete jobVariables.job.versions;
        delete jobVariables.job.scheduleStatus;
        delete jobVariables.job.creationDate;
        delete jobVariables.job.migrationStatus;
        delete jobVariables.job.migrationProjectId;
        delete jobVariables.job.isDeletable;

        delete jobVariables.jobVersion.number;
        delete jobVariables.jobVersion.creationDate;
        delete jobVariables.jobVersion.packageInfo?.downloadUrl;
        delete jobVariables.jobVersion.isCurrent;
        delete jobVariables.jobVersion.isMajor;
        delete jobVariables.jobVersion.creator;

        removeNullAttr(jobVariables);

        calls.push(
            axiosInstance({
                method: "POST",
                data: {
                    query: jobMutation,
                    variables: jobVariables,
                },
            })
        );
    }
    for await (let appToDuplicate of projectToDuplicate.labWebApps ?? []) {
        const volumeCreation = await axiosInstance({
            method: "POST",
            data: {
                query: `mutation createNewVolume($volume: VolumeInput!) {
                    createVolume(volume: $volume) {
                      id
                      name
                    }
                }`,
                variables: {
                    volume: {
                        name: appToDuplicate.versions[0].storagePaths[0],
                        description: "",
                        size: "64MB",
                        projectId: newProjectId,
                    },
                },
            },
        });
        console.log(volumeCreation.data);
        if (volumeCreation.data.errors) {
            console.log({
                name: appToDuplicate.versions[0].storagePaths[0],
                description: "",
                size: 64,
                projectId: newProjectId,
            });
            continue;
        }
        let appVariables: any = {
            app: {
                projectId: newProjectId,
                name: `${appToDuplicate.name.replace(new RegExp(/duplicated-(?:[a-zA-Z0-9])+/), "")} duplicated-${crypto
                    .randomBytes(2)
                    .toString("hex")}`,
                description: appToDuplicate.description,
                technologyId: appToDuplicate.technology.id,
                version: {
                    dockerInfo: appToDuplicate.versions[0].dockerInfo,
                    ports: [
                        ...appToDuplicate.versions[0].exposedPorts.map((ep) => ({
                            name: ep.name,
                            number: ep.port,
                            isRewriteUrl: ep.isRewriteUrl,
                            basePathVariableName: ep.basePathVariableName,
                            scope: ep.isAuthenticationRequired ? "PROJECT" : "PUBLIC",
                        })),
                    ],
                    volumesWithPath: [
                        {
                            path: appToDuplicate.versions[0].storagePaths[0],
                            volumeId: volumeCreation.data.data.createVolume.id,
                        },
                    ],
                    releaseNote: appToDuplicate.versions[0].releaseNote,
                },
                alerting: {
                    emails: appToDuplicate.alerting?.emails ?? ["fallback@nobody.co"],
                    statusList: appToDuplicate.alerting?.statusList.filter((sl) => AllowedAlertStatus.includes(sl)) ?? [
                        AllowedAlertStatus[0],
                    ],
                    logins: appToDuplicate.alerting?.loginEmails ?? [],
                },
            },
        };

        delete appVariables.app.id;

        removeNullAttr(appVariables);

        console.log(JSON.stringify(appVariables));
        calls.push(
            axiosInstance({
                method: "POST",
                data: {
                    query: appMutation,
                    variables: appVariables,
                },
            })
        );
    }
    Promise.all(calls)
        .then((results: any) => {
            console.log("Jobs & Apps Created");
            console.log(results.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

function removeNullAttr(obj: any): any {
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            removeNullAttr(obj[key]);
        } else {
            if (obj[key] === null) {
                delete obj[key];
            }
        }
    }
    return removeNullAttr;
}

function waitFor(seconds: number): Promise<void> {
    return new Promise((result, reject) => {
        setTimeout(() => {
            result();
        }, seconds * 1000);
    });
}
