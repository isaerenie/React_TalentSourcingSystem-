import { siteConfig } from "../configs/axiosConfig"
 import { IInteraction } from "../models/IInteraction"
 import { ICanInterJoin } from "../models/ICanInterJoin"
export const interactionList = () => {
    return siteConfig.get<IInteraction>('/interaction/list')
}

export const getCanInterList = (candidateId : number) => {
    return siteConfig.get<ICanInterJoin>('interaction/getCanInterList/' + candidateId)
}

export const interactionSave = (candidateId:number, content: string, candidateResponded:boolean,interactionType: string,date:Date) => {
    const sentData = {
        candidateId:candidateId,
        content: content,
        candidateResponded: candidateResponded,
        interactionType: interactionType,
        date:date
    }
    return siteConfig.post<IInteraction>('/interaction/save', sentData)
}

export const interactionDelete = (interactionId:number) => {
    return siteConfig.delete<IInteraction>('/interaction/delete/' + interactionId)
}
export const interactionChangeStatus = (interactionId:number) => {
    return siteConfig.delete<IInteraction>('/interaction/delete/' + interactionId)
}

export const interactionUpdate =  (interactionId:number,candidateId:number, content: string, candidateResponded:boolean,interactionType: string,date:Date) => {
    console.log("fdsfdf"+interactionId);
    
    const sendData = {
        interactionId:interactionId,
        candidateId:candidateId,
        content: content,
        candidateResponded: candidateResponded,
        interactionType: interactionType,
        date:date
     }
    return siteConfig.post("interaction/update" ,  sendData )
}




