import React from 'react'
import { View , Text , StyleSheet , FlatList , TouchableOpacity , TextInput} from 'react-native'
import {useState } from 'react'
import axios from 'axios' 
import { color } from 'react-native-reanimated'


function index() {
    const [data,setData] = useState([])
    const [textInput , setTextInput] = useState("")
    const apiKey = "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"
    const apiUrl = "https://api.openai.com/v1/engines/text-davinci-002/completions"
    const handleSend = async()=>{
        const prompt = textInput;
        const response = await axios.post(apiUrl , {
            prompt:prompt,
            max_tokens:1024,
            temprature:0.5,
         
        },{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${apiKey}`,
            }
        })
        const text = response.data.choices[0].text; 
        setData([...data , {type:"USER" , text:textInput} , {type:"AI" , text:textInput}]);
        setTextInput('')
    }
  return (
    <View style={styles.container}>
    <Text style={styles.header}>Chat Ai</Text>
    <FlatList  data={data} keyExtractor={item=>item} renderItem={({item})=>(
        <View style={styles.chatContainer}>
            <Text style={styles.type(item.type)}> {item.type} </Text>
            <Text style={styles.text}> {item.text} </Text>
        </View>

    )} />

    <View style={styles.query} horizontal>
        <TextInput style={styles.textInput} value={textInput} onChangeText={(text)=>setTextInput(text)}/>
    <TouchableOpacity style={styles.btn} > 
        <Text>SEND</Text>
    </TouchableOpacity>
    </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        justifyContent: 'center',
    },
    header: {
        textAlign:'center',
        fontSize:28,
        fontWeight:'bold',
        marginTop:70,
        marginBottom:20,
    },
    chatContainer:{
        flexDirection:"row",
        marginLeft:10,
        justifyContent:"center"
    },
    type:(type)=>({
        color:type === "AI" ? "red" : "green",
        fontWeight:"bold",
        }),
    text:{
        backgroundColor: "white",
        color:"black",
        marginLeft:10,
        borderWidth:1,
        borderColor:"grey",
        borderRadius:10
    },
    query:{
        flexDirection:"row",
        alignItems:"flex-end",
        marginBottom:10,
        
    },
    textInput:{
        flex:1,
        borderWidth:1,
        marginLeft:10,

    }
    



})

export default index
