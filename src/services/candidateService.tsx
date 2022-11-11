import { siteConfig } from "../configs/axiosConfig"
import { CandidateInfo, ICandidate } from "../models/ICandidate"
 
export const candidateList = () => {
    return siteConfig.get<ICandidate>('/candidate/list')
}
export const findByCandidateId = (candidateId:number) => {
    return siteConfig.get<CandidateInfo>('/candidate/findByCandidateId/'+candidateId)
}

export const candidateSave = (nameSurname: string, phone: string,  email: string,candidateStatus:string) => {
    const sentData = {
        nameSurname: nameSurname,
        phone: phone,
        email: email,  
        candidateStatus: candidateStatus
        
    }
    return siteConfig.post<ICandidate>('/candidate/save', sentData)
}

export const candidateDelete = (candidateId:number) => {
    return siteConfig.delete<ICandidate>('/candidate/delete/' + candidateId)
}

export const candidateUpdate = (candidateId:number,nameSurname: string, phone: string,  email: string,candidateStatus:string ) => {
    const sendData = {
        candidateId:candidateId,nameSurname: nameSurname, phone: phone,  email: email,candidateStatus:candidateStatus
    }
    return siteConfig.post<ICandidate>("candidate/update" ,  sendData )
}
export const candidateChangeStatus = (candidateId:number,candidateStatus:string,nameSurname:string, phone:string, email :string) => {
console.log("buraya geldi"+candidateId);
console.log(candidateStatus);

    const sendData = {
        candidateId:candidateId,
        candidateStatus:candidateStatus,
        nameSurname:nameSurname,
        phone:phone,
        email:email
    }
    return siteConfig.post("candidate/candidateChangeStatus" ,sendData    )
}



