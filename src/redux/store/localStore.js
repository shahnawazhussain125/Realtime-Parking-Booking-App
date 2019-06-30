export const loadState = () =>{
    try
    {
        let seralizedState = localStorage.getItem("state");

        if( seralizedState == null )
        {
            return undefined;
        }
        else
        {
            return JSON.parse(seralizedState);
        }

    }
    catch(error)
    {
        return undefined;
    }
}

export const saveState = (state) =>{
    localStorage.setItem("state", JSON.stringify(state));
}

