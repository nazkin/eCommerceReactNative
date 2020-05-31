import urls from '../../../constants/httpRequests'
//login
//
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN ='LOG_IN';

export const LOG_OUT = 'LOG_OUT';

export const signUp = (email, password)=> {
    return async dispatch =>{
       const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${urls.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password:password,
                returnSecureToken: true
            })
        });

        const resData = await res.json()
        

        if(!res.ok){
            throw new Error('Something went wrong during sign-up process');
        }
        console.log(resData);
        dispatch({type: SIGN_UP, token: resData.idToken, userID: resData.localId})
    }
}
export const login = (email, password)=>{
    return async dispatch =>{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${urls.apiKey}`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 email: email,
                 password:password,
                 returnSecureToken: true
             })
         });
 
         const resData = await res.json()
         
 
         if(!res.ok){
             throw new Error('Something went wrong during login process');
         }
         console.log(resData);
         dispatch({type: LOG_IN, token: resData.idToken, userID: resData.localId})
     }
}

