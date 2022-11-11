export interface IInteraction {
    status: boolean;
    result: InteractionInfo[];
}

export interface InteractionInfo {
    candidateId:        number;
    interactionType:    string;
    content:            string;
    date:               Date;
    candidateResponded: boolean;
    interactionId:      number;
}
