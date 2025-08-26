const capitalize=(str:string)=>{
    if(!str.trim()) return str
    return str.charAt(0).toUpperCase()+str.slice(1)
}

export default capitalize