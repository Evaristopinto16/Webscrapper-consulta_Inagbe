const rp = require('request-promise')

async function main(bi){
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
        const result = await rp({
            url: "https://api.inagbe.gov.ao/api/v1/login",
            method: 'POST',
            form: {
                email:"baptistasemente@gmail.com",
                password:"934593525"
            }
        
        })
    let  {data} = JSON.parse(result)
    let token = data.token.token
    //020788845KS057

    let inagbeResult = await rp(`https://api.inagbe.gov.ao/api/v1/candidaturasinternaporbi/${bi}?token=${token}`, {
        headers: {
            'Accept':'application/json',
          'Authorization':`Bearer ${token}`,
           'Host':'api.inagbe.gov.ao',
        'Origin':'https://inagbe.gov.ao',
        'Referer':'https://inagbe.gov.ao/',
        'Sec-Ch-Ua':'"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
         
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0' 
    }
    })
     inagbeResult = JSON.parse(inagbeResult)
    
     let finalDados

     if(inagbeResult.data != null){

        if(inagbeResult.data.edu_regime_candidatura_id != null){
            finalDados = {
                nome: inagbeResult.data.nome,
                bi: inagbeResult.data.ndi,
                dataNascimento:  inagbeResult.data.data_nascimento,
                classificacao: inagbeResult.data.classificacao,
                x_idade: inagbeResult.data.x_idade,
                x_media: inagbeResult.data.x_media,
                x_curso: inagbeResult.data.x_curso,
                x_carenciado: inagbeResult.data.x_carenciado,
                edu_regime_candidatura_id: inagbeResult.data.edu_regime_candidatura_id,
                codigo_validacao: inagbeResult.data.codigo_validacao,
                
        
            }
    
        }else{
            finalDados = {
                error: 0,
            message: "Só estão desponivel resultados de 2023/2024, por favor tente novamente"
            }
        }
      
     }else{
        finalDados = {
            error: 0,
            message: "Numero do Bilhente errado, por favor! tente novamente"
        }
     }
   
   
    return finalDados
}

module.exports =  main