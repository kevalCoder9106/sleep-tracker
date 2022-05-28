const RenderIf = ({ children, show }) => {
    if (show === true){
        return(
            <>
                {children}
            </>
        )
    }
    else{
        return null
    }
}

export default RenderIf