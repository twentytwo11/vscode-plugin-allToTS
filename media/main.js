(function(){
    const vscode = acquireVsCodeApi();

    console.log('yah!')
    var _this = this
    _this.tsRes = ''
    const actioner = /** @type {HTMLElement} */ (document.getElementById('action-getts'));
    const jsonSource = /** @type {HTMLElement} */ (document.getElementById('json-content'));
    jsonSource.onkeyup = function(){
        _this.content = this.value
        vscode.postMessage({
            command:'cache-value',
            text:this.value
        })
    }
    const basic_types = ['string','boolean','number']
    function getKeyType(data){
        let type = undefined

        switch(typeof data){
            case 'string':
                type = 'string'
                break
            case 'boolean':
                type = 'boolean'
                break
            case 'number':
                type = 'number'
            case 'object':
                type = Array.isArray(data) ? 'array' : 'object'
        }
        return type
    }

    // function handleArrType(data,key){
    //     let template = `I${key}[]`
    // }
    function transToTS(source,key = 'Data'){
        const jsonData = JSON.parse(source)
        let tsObj = ''
        for(let e in jsonData){
            const type = getKeyType(jsonData[e])
            let item = ''
            if(basic_types.includes(type)){
                item = `${e}:${type}`
            }else{
                item = `I${e}Item：[]`
                if(jsonData[e].length){
                    transToTS(JSON.stringify(jsonData[e][0]),e)
                }
            }
            tsObj += item + '<br>'
        }
        // _this.tsRes += 
        // _this.tsRes = _this.tsRes + `interface IData ${JSON.parse(JSON.stringify(tsObj))}`
        _this.tsRes += `interface I${key}` + `{<br>${tsObj}}<br>`
    }
    actioner.addEventListener('click',function(){
        transToTS(_this.content)

        
        const tsResult = /** @type {HTMLElement} */ (document.getElementById('ts-content'));
        tsResult.innerHTML = _this.tsRes
        // vscode.postMessage({
        //     command: 'write-file',
        //     text:''
        // });
    })
}())