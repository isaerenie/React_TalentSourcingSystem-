export interface ICanInterJoin {
    status: boolean;
    result: ICanInterJoinInfo[];
}

export interface ICanInterJoinInfo {
    candidateId:        number;
    nameSurname:        string;
    interactionType:    string;
    content:            string;
    date:               Date;
    candidateResponded: boolean;
    interactionId:      number;
}
