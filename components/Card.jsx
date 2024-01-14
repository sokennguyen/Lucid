import {View, Text, StyleSheet} from 'react-native'
const Card = ({content}) => {
    let condensed = content;
    if (content.length>70)
        {
            condensed = condensed.slice(0,condensed.indexOf('.',140))+' ...'
        }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{condensed}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignSelf:'center',
        height:'12rem',
        width:'90%',
        backgroundColor:'white',
        margin:10,
        borderRadius:10
    },
    text:{
        padding:20,
        textAlign:'center'
    }
})
export default Card
