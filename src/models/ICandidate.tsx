export interface ICandidate {
    status: boolean;
    result: CandidateInfo[];
}

export interface CandidateInfo {
    candidateId:     number;
    nameSurname:     string;
    phone:           string;
    email:           string;
    candidateStatus: string;
}
export enum candidateStatus{
    Small,
    Large
}