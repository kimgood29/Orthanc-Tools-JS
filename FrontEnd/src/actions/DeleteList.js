import { ADD_DELETE_LIST, REMOVE_PATIENT_DELETE_LIST, REMOVE_STUDY_DELETE_LIST, EMPTY_DELETE_LIST} from './actions-types'

export function addToDeleteList(deleteList){
    return {
        type: ADD_DELETE_LIST, 
        payload: deleteList
    }
}

export function removePatientFromDeleteList(patientID){
    return {
        type: REMOVE_PATIENT_DELETE_LIST, 
        payload: patientID
    }
}

export function removeStudyFromDeleteList(studyID){
    return{
        type: REMOVE_STUDY_DELETE_LIST,
        payload: studyID
    }
}

export function emptyDeleteList() {
    return {
        type : EMPTY_DELETE_LIST,
    }
}