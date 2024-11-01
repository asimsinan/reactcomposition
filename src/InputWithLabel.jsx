function InputWithLabel({id,label,type,value,onInputChange}){
    
    return(
        <>
        <label htmlFor={id}>{label}:&nbsp;</label>
        <input id={id} type={type}  
        value={value} onChange={onInputChange}/>
        </>
    )
}
export default InputWithLabel;