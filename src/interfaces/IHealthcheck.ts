export interface IHealthcheck {
    status: number;
    serverIsRunningSince: number;
    serverConnected: boolean;
    pid: number;
    message: string;
    date: string;
}
