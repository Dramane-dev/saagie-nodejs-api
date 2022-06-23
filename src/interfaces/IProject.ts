interface IBasicProject {
    id: string;
    name: string;
    description: string;
    status: string;
    jobsCount: number;
    creator: string;
    volumes?: IVolumes[];
    pipelines?: IPipelines[];
}

interface IVolumes {
    id: string;
    name: string;
    description: string;
    size: string;
    projectId: string;
    creationDate: string;
    linkedApp: {
        id: string;
        name: string;
    };
}

interface IPipelines {
    id: string;
    name: string;
    description: string;
    alerting: IAlerting;
    pipelineInstanceCount: number;
    instances: [
        {
            id: string;
            number: number;
            status: string;
            jobsInstance: {
                id: string;
                number: number;
                status: string;
                statusDetails: string;
                startTime: string;
                endTime: string;
                pipelineInstanceId: string;
                jobId: string;
                jobNodeId: string;
                effectiveDockerImage: string;
                sparkuiUrl: string;
            };
            conditionsInstance: {
                conditionNodeId: string;
                isSuccess: boolean;
            };
            nodeStatuses: {
                nodeId: string;
                status: string;
            };
            version: [
                {
                    number: number;
                    releaseNote: string;
                    graph: {
                        jobNodes: {
                            id: string;
                            job: {
                                id: string;
                                name: string;
                            };
                        };
                        conditionNodes: {
                            id: string;
                            position: IPosition;
                            nextNodesSuccess: [];
                            nextNodesFailure: [];
                        };
                    };
                    creationDate: string;
                    creator: string;
                    isCurrent: boolean;
                    isMajor: boolean;
                }
            ];
            startTime: string;
            endTime: string;
            pipelineId: string;
        }
    ];
    versions: [
        {
            number: 1;
            releaseNote: string;
            graph: {
                jobNodes: [
                    {
                        id: string;
                        job: {
                            id: string;
                            name: string;
                            description: string;
                            countJobInstance: number;
                            versions: [
                                {
                                    number: number;
                                    creationDate: string;
                                    releaseNote: string;
                                    runtimeVersion: string;
                                    commandLine: string;
                                    packageInfo: string;
                                    dockerInfo: {
                                        image: string;
                                        dockerCredentialsId: string;
                                    };
                                    extraTechnology: {
                                        language: string;
                                        version: string;
                                    };
                                    isCurrent: boolean;
                                    isMajor: boolean;
                                    creator: string;
                                    exposedPorts: IExposedPorts[];
                                    storagePaths: string[];
                                }
                            ];
                            category: string;
                            technology: {
                                id: string;
                            };
                            isScheduled: boolean;
                            cronScheduling: string;
                            scheduleStatus: string;
                            scheduleTimezone: string;
                            alerting: IAlerting;
                            isStreaming: boolean;
                            creationDate: string;
                            migrationStatus: string;
                            migrationProjectId: string;
                            isDeletable: boolean;
                            graphPipelines: IGraphPipelines[];
                            storageSizeInMB: string;
                            doesUseGPU: boolean;
                            resources: IRessources[];
                        };
                        position: IPosition;
                        nextNodes: [];
                    }
                ];
            };
        }
    ];
    creationDate: string;
    creator: string;
    isScheduled: boolean;
    cronScheduling: string;
    scheduleStatus: string;
    scheduleTimezone: string;
    isLegacyPipeline: boolean;
}

interface IRessources {
    cpu: {
        request: string;
        limit: number;
    };

    memory: {
        request: string;
        limit: number;
    };

    gpu: {
        request: string;
        limit: number;
    };
}

interface IAlerting {
    emails: string;
    statusList: string[];
    loginEmails: {
        login: string;
        email: string;
    };
}

interface IGraphPipelines {
    id: string;
    name: string;
}

interface IPosition {
    x: number;
    y: number;
}

interface IExposedPorts {
    name: string;
    port: number;
    isRewriteUrl: boolean;
    basePathVariableName: string;
    isAuthenticationRequired: boolean;
}

interface ILabWebApps {
    id: string;
    name: string;
    description: string;
    countJobInstance: number;
    versions: [
        {
            number: number;
            creationDate: string;
            releaseNote: string;
            runtimeVersion: string;
            commandLine: string;
            packageInfo: {
                name: string;
                downloadUrl: string;
            };
            dockerInfo: {
                image: string;
                dockerCredentialsId: string;
            };
            extraTechnology: {
                language: string;
                version: string;
            };
            isCurrent: boolean;
            isMajor: boolean;
            creator: string;
            exposedPorts: IExposedPorts[];
            storagePaths: string[];
        }
    ];
    category: string;
    technology: {
        id: string;
    };
    isScheduled: boolean;
    cronScheduling: string;
    scheduleStatus: string;
    scheduleTimezone: string;
    alerting: IAlerting;
    isStreaming: boolean;
    creationDate: string;
    migrationStatus: string;
    migrationProjectId: string;
    isDeletable: boolean;
    storageSizeInMB: number;
    doesUseGPU: boolean;
    resources: IRessources[];
}

interface IJobs {
    id: string;
    name: string;
    description: string;
    countJobInstance: number;
    versions: [
        {
            number: number;
            creationDate: string;
            releaseNote: string;
            runtimeVersion: string;
            commandLine: string;
            packageInfo: {
                name: string;
                downloadUrl: string;
            };
            dockerInfo: {
                image: string;
                dockerCredentialsId: string;
            };
            extraTechnology: {
                language: string;
                version: string;
            };
            isCurrent: boolean;
            isMajor: boolean;
            creator: string;
            exposedPorts: IExposedPorts;
            storagePaths: string[];
        }
    ];
    category: string;
    technology: {
        id: string;
    };
    isScheduled: boolean;
    cronScheduling: string;
    scheduleStatus: string;
    scheduleTimezone: string;
    alerting: IAlerting;
    isStreaming: boolean;
    creationDate: string;
    migrationStatus: string;
    migrationProjectId: string;
    isDeletable: boolean;
    storageSizeInMB: string;
    doesUseGPU: boolean;
    resources: IRessources[];
}

export interface IProject {
    project: IBasicProject;
    labWebApps?: ILabWebApps[];
    jobs?: IJobs[];
}
