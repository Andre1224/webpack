function add(...arg){
    return arg.reduce((x , y) => x + y)
}

export default add