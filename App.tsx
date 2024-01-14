import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  Button,
  ScrollView
} from 'react-native';
import {useState, useEffect} from 'react'
import Card from './components/Card'
import dreamService from './services/dream'

function App(): React.JSX.Element {
    const [usrInp,setUsrInp] = useState('')

    //mocking served data
    const [otherDreams,setOtherDreams] = useState([''])

    useEffect(()=>{
        const fetchDb = async () => {
            let dreams = await dreamService.getAll()
            dreams = dreams.map(dream => dream.content).reverse()
            setOtherDreams(dreams)
        }
        fetchDb()
    },[])

    const btnOnPress = async () => {
        if (usrInp == '') return
        const newDreamObj = {
            content: usrInp
        }
        await dreamService.post(newDreamObj)
        const refreshedDreams = await dreamService.getAll()
        const refreshedDreamsContent = refreshedDreams.map(dream=>dream.content).reverse()
        setOtherDreams(refreshedDreamsContent)
        setUsrInp('')
    }

    return (
        <ScrollView style={styles.root}>                
            <Pressable //for closing the keyboard
                android_disableSound={true} //pressable invoke android's default sounds
                onPress={()=>Keyboard.dismiss()}>
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        style={styles.input}
                        placeholder='Last night I dreamed about...'
                        placeholderTextColor='#E5E5E5'
                        onChangeText={setUsrInp}
                        value={usrInp}
                    />
                    <Button color='#FCA311'
                            onPress={btnOnPress} title='post'/>
                </View>
                <View style={styles.someoneContainer}>
                    <Text style={styles.someoneText}>Someone has dreamed about</Text>
                </View>
                {otherDreams.map((dream,index)=>
                    <Card key={index} content={dream}/>
                )}
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        backgroundColor:'#14213D'
    }, 
    button: {
        color:'#FCA311'
    },
    input: {
        color:'#E5E5E5',
        borderColor:'#E5E5E5',
        flex:1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    someoneContainer:{
        marginTop:30,
        marginBottom:30
    },
    someoneText: {
        color:'#ffffff',
        textAlign:'center',
        fontFamily: 'Roboto',
        fontSize:30
    }
})


export default App;
