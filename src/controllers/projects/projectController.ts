import { AxiosInstance } from "axios";
import { Request, Response } from "express";
import { generateAxiosInstance } from "../../defaults/generateAxiosInstance";
import { IProject } from "../../interfaces/IProject";
import crypto from "crypto";

export const ProjectController = {
    async getAll(req: Request, res: Response) {
        let query: string = `query {
          projects {
            id
            name
            creator
            description
            jobsCount
            status
          }
        }`;
        let axiosInstance: AxiosInstance = await generateAxiosInstance();

        axiosInstance({
            method: "POST",
            data: {
                query,
            },
        })
            .then((result) => {
                return res.status(200).send(result.data);
            })
            .catch((error) => {
                return res.status(404).send({
                    message: error,
                });
            });
    },
    async getById(req: Request, res: Response) {
        let projectId: string = req.params.projectId;
        let query: string = `query {
            project(id: "${projectId}") {
              id
              name
              description
              status
              jobsCount
              creator
              apps {
                id
                name
                description
                creationDate
                creator
                versions {
                  number
                  creationDate
                  releaseNote
                  dockerInfo {
                    image
                    dockerCredentialsId
                  }
                  creator
                  ports {
                    name
                    number
                    isRewriteUrl
                    basePathVariableName
                    scope
                    internalUrl
                  }
                  isMajor
                  volumesWithPath {
                    path
                    volume {
                      id
                      name
                      creator
                      description
                      size
                      projectId
                      creationDate
                      linkedApp {
                        id
                        name
                      }
                    }
                  }
                }
                currentVersion {
                  number
                  creationDate
                  releaseNote
                  dockerInfo {
                    image
                    dockerCredentialsId
                  }
                  creator
                  ports {
                    name
                    number
                    isRewriteUrl
                    basePathVariableName
                    scope
                    internalUrl
                  }
                  isMajor
                  volumesWithPath {
                    path
                    volume {
                      id
                      name
                      creator
                      description
                      size
                      projectId
                      creationDate
                      linkedApp {
                        id
                        name
                      }
                    }
                  }
                }
                technology {
                  id
                }
                project {
                  id
                  name
                }
                linkedVolumes {
                  id
                  name
                  creator
                  description
                  size
                  projectId
                  creationDate
                  linkedApp {
                    id
                    name
                  }
                }
                isGenericApp
                history {
                  id
                  events {
                    event {
                      recordAt
                    }
                    transitionTime
                  }
                  runningVersionNumber
                  currentStatus
                  startTime
                  stopTime
                }
                alerting {
                  emails
                  statusList
                  loginEmails {
                    login
                    email
                  }
                }
              }
              volumes {
                id
                name
                description
                size
                projectId
                creationDate
                linkedApp {
                  id
                  name
                }
              }
              pipelines {
                id
                name
                description
                alerting {
                  emails
                  statusList
                  loginEmails {
                    login
                    email
                  }
                }
                pipelineInstanceCount
                instances {
                  id
                  number
                  status
                  jobsInstance {
                    id
                    number
                    status
                    statusDetails
                    startTime
                    endTime
                    pipelineInstanceId
                    jobId
                    jobNodeId
                    effectiveDockerImage
                    sparkuiUrl
                  }
                  conditionsInstance {
                    conditionNodeId
                    isSuccess
                  }
                  nodeStatuses {
                    nodeId
                    status
                  }
                  version {
                    number
                    releaseNote
                    graph {
                      jobNodes {
                        id
                        job {
                          id
                          name
                        }
                      }
                      conditionNodes {
                        id
                        position {
                          x
                          y
                        }
                        nextNodesSuccess
                        nextNodesFailure
                      }
                    }
                    creationDate
                    creator
                    isCurrent
                    isMajor
                  }
                  startTime
                  endTime
                  pipelineId
                }
                versions {
                  number
                  releaseNote
                  graph {
                    jobNodes {
                      id
                      job {
                        id
                        name
                        description
                        countJobInstance
                        versions {
                          number
                          creationDate
                          releaseNote
                          runtimeVersion
                          commandLine
                          packageInfo {
                            name
                            downloadUrl
                          }
                          dockerInfo {
                            image
                            dockerCredentialsId
                          }
                          extraTechnology {
                            language
                            version
                          }
                          isCurrent
                          isMajor
                          creator
                          exposedPorts {
                            name
                            port
                            isRewriteUrl
                            basePathVariableName
                            isAuthenticationRequired
                          }
                          storagePaths
                        }
                        category
                        technology {
                          id
                        }
                        isScheduled
                        cronScheduling
                        scheduleStatus
                        scheduleTimezone
                        alerting {
                          emails
                          statusList
                          loginEmails {
                            login
                            email
                          }
                        }
                        isStreaming
                        creationDate
                        migrationStatus
                        migrationProjectId
                        isDeletable
                        pipelines {
                          id
                          name
                        }
                        graphPipelines {
                          id
                          name
                        }
                        storageSizeInMB
                        doesUseGPU
                        resources {
                          cpu {
                            request
                            limit
                          }
                          memory {
                            request
                            limit
                          }
                          gpu {
                            request
                            limit
                          }
                        }
                      }
                      position {
                        x
                        y
                      }
                      nextNodes
                    }
                    conditionNodes {
                      id
                      position {
                        x
                        y
                      }
                      nextNodesSuccess
                      nextNodesFailure
                    }
                  }
                  creationDate
                  creator
                  isCurrent
                  isMajor
                }
                project {
                  id
                  name
                }
                creationDate
                creator
                isScheduled
                cronScheduling
                scheduleStatus
                scheduleTimezone
                isLegacyPipeline
              }
            }
            labWebApps(projectId: "${projectId}") {
              id
              name
              description
              countJobInstance
              versions(onlyCurrent: true) {
                number
                creationDate
                releaseNote
                runtimeVersion
                commandLine
                packageInfo {
                  name
                  downloadUrl
                }
                dockerInfo {
                  image
                  dockerCredentialsId
                }
                extraTechnology {
                  language
                  version
                }
                isCurrent
                isMajor
                creator
                exposedPorts {
                  name
                  port
                  isRewriteUrl
                  basePathVariableName
                  isAuthenticationRequired
                }
                storagePaths
              }
              category
              technology {
                id
              }
              isScheduled
              cronScheduling
              scheduleStatus
              scheduleTimezone
              alerting {
                emails
                statusList
                loginEmails {
                  login
                  email
                }
              }
              isStreaming
              creationDate
              migrationStatus
              migrationProjectId
              isDeletable
              storageSizeInMB
              doesUseGPU
              resources {
                cpu {
                  request
                  limit
                }
                memory {
                  request
                  limit
                }
                gpu {
                  request
                  limit
                }
              }
            }
            jobs(projectId: "${projectId}") {
              id
              name
              description
              countJobInstance
              versions(onlyCurrent: true) {
                number
                creationDate
                releaseNote
                runtimeVersion
                commandLine
                packageInfo {
                  name
                  downloadUrl
                }
                dockerInfo {
                  image
                  dockerCredentialsId
                }
                extraTechnology {
                  language
                  version
                }
                isCurrent
                isMajor
                creator
                exposedPorts {
                  name
                  port
                  isRewriteUrl
                  basePathVariableName
                  isAuthenticationRequired
                }
                storagePaths
              }
              category
              technology {
                id
              }
              isScheduled
              cronScheduling
              scheduleStatus
              scheduleTimezone
              alerting {
                emails
                statusList
                loginEmails {
                  login
                  email
                }
              }
              isStreaming
              creationDate
              migrationStatus
              migrationProjectId
              isDeletable
              storageSizeInMB
              doesUseGPU
              resources {
                cpu {
                  request
                  limit
                }
                memory {
                  request
                  limit
                }
                gpu {
                  request
                  limit
                }
              }
            }
        }`;
        let axiosInstance: AxiosInstance = await generateAxiosInstance();

        axiosInstance({
            method: "POST",
            data: {
                query,
            },
        })
            .then((result) => {
                return res.status(200).send(result.data);
            })
            .catch((error) => {
                return res.status(404).send({
                    message: error,
                });
            });
    },
    async duplicate(req: Request, res: Response) {
        let projectId: string = req.params.projectId;
        let query: string = `query {
        project(id: "${projectId}") {
          id
          name
          description
          status
          jobsCount
          creator
          volumes {
            id
            name
            description
            size
            projectId
            creationDate
            linkedApp {
              id
              name
            }
          }
          pipelines {
            id
            name
            description
            alerting {
              emails
              statusList
              loginEmails {
                login
                email
              }
            }
            pipelineInstanceCount
            instances {
              id
              number
              status
              jobsInstance {
                id
                number
                status
                statusDetails
                startTime
                endTime
                pipelineInstanceId
                jobId
                jobNodeId
                effectiveDockerImage
                sparkuiUrl
              }
              conditionsInstance {
                conditionNodeId
                isSuccess
              }
              nodeStatuses {
                nodeId
                status
              }
              version {
                number
                releaseNote
                graph {
                  jobNodes {
                    id
                    job {
                      id
                      name
                    }
                  }
                  conditionNodes {
                    id
                    position {
                      x
                      y
                    }
                    nextNodesSuccess
                    nextNodesFailure
                  }
                }
                creationDate
                creator
                isCurrent
                isMajor
              }
              startTime
              endTime
              pipelineId
            }
            versions {
              number
              releaseNote
              graph {
                jobNodes {
                  id
                  job {
                    id
                    name
                    description
                    countJobInstance
                    versions {
                      number
                      creationDate
                      releaseNote
                      runtimeVersion
                      commandLine
                      packageInfo {
                        name
                        downloadUrl
                      }
                      dockerInfo {
                        image
                        dockerCredentialsId
                      }
                      extraTechnology {
                        language
                        version
                      }
                      isCurrent
                      isMajor
                      creator
                      exposedPorts {
                        name
                        port
                        isRewriteUrl
                        basePathVariableName
                        isAuthenticationRequired
                      }
                      storagePaths
                    }
                    category
                    technology {
                      id
                    }
                    isScheduled
                    cronScheduling
                    scheduleStatus
                    scheduleTimezone
                    alerting {
                      emails
                      statusList
                      loginEmails {
                        login
                        email
                      }
                    }
                    isStreaming
                    creationDate
                    migrationStatus
                    migrationProjectId
                    isDeletable
                    pipelines {
                      id
                      name
                    }
                    graphPipelines {
                      id
                      name
                    }
                    storageSizeInMB
                    doesUseGPU
                    resources {
                      cpu {
                        request
                        limit
                      }
                      memory {
                        request
                        limit
                      }
                      gpu {
                        request
                        limit
                      }
                    }
                  }
                  position {
                    x
                    y
                  }
                  nextNodes
                }
                conditionNodes {
                  id
                  position {
                    x
                    y
                  }
                  nextNodesSuccess
                  nextNodesFailure
                }
              }
              creationDate
              creator
              isCurrent
              isMajor
            }
            creationDate
            creator
            isScheduled
            cronScheduling
            scheduleStatus
            scheduleTimezone
            isLegacyPipeline
          }
        }
        labWebApps(projectId: "${projectId}") {
          id
          name
          description
          countJobInstance
          versions(onlyCurrent: true) {
            number
            creationDate
            releaseNote
            runtimeVersion
            commandLine
            packageInfo {
              name
              downloadUrl
            }
            dockerInfo {
              image
              dockerCredentialsId
            }
            extraTechnology {
              language
              version
            }
            isCurrent
            isMajor
            creator
            exposedPorts {
              name
              port
              isRewriteUrl
              basePathVariableName
              isAuthenticationRequired
            }
            storagePaths
          }
          category
          technology {
            id
          }
          isScheduled
          cronScheduling
          scheduleStatus
          scheduleTimezone
          alerting {
            emails
            statusList
            loginEmails {
              login
              email
            }
          }
          isStreaming
          creationDate
          migrationStatus
          migrationProjectId
          isDeletable
          storageSizeInMB
          doesUseGPU
          resources {
            cpu {
              request
              limit
            }
            memory {
              request
              limit
            }
            gpu {
              request
              limit
            }
          }
        }
        jobs(projectId: "${projectId}") {
          id
          name
          description
          countJobInstance
          versions(onlyCurrent: true) {
            number
            creationDate
            releaseNote
            runtimeVersion
            commandLine
            packageInfo {
              name
              downloadUrl
            }
            dockerInfo {
              image
              dockerCredentialsId
            }
            extraTechnology {
              language
              version
            }
            isCurrent
            isMajor
            creator
            exposedPorts {
              name
              port
              isRewriteUrl
              basePathVariableName
              isAuthenticationRequired
            }
            storagePaths
          }
          category
          technology {
            id
          }
          isScheduled
          cronScheduling
          scheduleStatus
          scheduleTimezone
          alerting {
            emails
            statusList
            loginEmails {
              login
              email
            }
          }
          isStreaming
          creationDate
          migrationStatus
          migrationProjectId
          isDeletable
          storageSizeInMB
          doesUseGPU
          resources {
            cpu {
              request
              limit
            }
            memory {
              request
              limit
            }
            gpu {
              request
              limit
            }
          }
        }
      }`;
        let axiosInstance: AxiosInstance = await generateAxiosInstance();

        axiosInstance({
            method: "POST",
            data: {
                query,
            },
        })
            .then((result) => {
                let projectToDuplicate: IProject = result.data.data;
                let mutation: string = `mutation createNewProject($project: ProjectInput!) {
              createProject(project: $project) {
                id,
                name,
                description,
                apps {
                  id
                },
              }
            }
            `;
                console.log(projectToDuplicate.labWebApps?.filter((app) => app.id)[0].technology.id);
                let variables: object = {
                    project: {
                        name: `${projectToDuplicate.project.name.replace(
                            new RegExp(/duplicated-(?:[a-zA-Z0-9])+/),
                            ""
                        )} duplicated-${crypto.randomBytes(2).toString("hex")}`,
                        description: `${projectToDuplicate.project.description}`,
                        appTechnologies: [
                            {
                                id: `${projectToDuplicate.labWebApps?.filter((app) => app.id)[0].technology.id}`,
                            },
                        ],
                        authorizedGroups: {
                            name: "estiam_g03_hackaton",
                            role: "ROLE_PROJECT_MANAGER",
                        },
                    },
                    //   jobs: [
                    //     projectToDuplicate.jobs?.map(job => {
                    //     return {
                    //       name: `${job.name}`,
                    //       description: `${job.description}`,
                    //       countJobInstance: `${job.countJobInstance}`,
                    //       category: `${job.category}`,
                    //       isScheduled: `${job.isScheduled}`,
                    //     }
                    //   })
                    //  ]
                };
                projectToDuplicate.labWebApps?.map((app) => console.log(app.name));
                axiosInstance({
                    method: "POST",
                    data: {
                        query: mutation,
                        variables: variables,
                    },
                })
                    .then((result) => {
                        return res.status(200).send(result.data);
                    })
                    .catch((error) => {
                        return res.status(400).send({
                            message: error,
                        });
                    });
            })
            .catch((error) => {
                console.log(error);
                return res.status(404).send({
                    message: error,
                });
            });
    },
};
