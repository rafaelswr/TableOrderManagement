import React from "react"
import {View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, } from "react-native"
import Button_1 from "../../components/Button";
import CheckBox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";


    
const WeekSchedule = ({weekDays, week_dispatch, onPressForward, onPressBack}) => {

    const renderItem = ({index, item})=>{

        return(
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                <View style={{flex:0.2,padding:15,alignSelf:"center",backgroundColor:"white",borderRadius:10,borderColor:"#E5e6e6", borderWidth:3, marginHorizontal:10}}>
                    <Text>{item.day}</Text>
                </View>
                <View style={{ flex:0.1,alignSelf:"auto"}}>
                    <CheckBox
                        value={item.status}
                        onValueChange={()=>{
                            week_dispatch({type:"updateValue",payload:{day:item.day, field:"status",value:!item.status}});
                            if(!weekDays.status){
                                week_dispatch({type:"updateValue",payload:{day:item.day, field:"open",value:""}});
                                week_dispatch({type:"updateValue",payload:{day:item.day, field:"close",value:""}});
                           
                            }
                        }}
                        style={styles.checkbox}
                    />
                </View>
    
                
                <View style={{flex:0.2, height:95, justifyContent:"center",marginLeft:20, alignItems:"center", flex:0.3}}>
                        {item.status!=false &&
                            <TouchableOpacity onPress={()=>
                                week_dispatch({type:"updateValue", payload:{day:item.day, field:"openPicker", value:!item.openPicker}})
                            } style={[styles.button]} underlayColor="transparent">
                                <Text style={styles.buttonText}>{item.open}</Text>
                            </TouchableOpacity>
                        }
                        {item.openPicker && (
                            <>
                                <DateTimePicker
                                    mode="time" 
                                    is24Hour={true}
                                    display="clock"
                                    value= {new Date()} 
                                    onChange={(event, date)=>{
                                        week_dispatch({ type: "updateValue", payload: { day: item.day, field: "openPicker", value: !item.openPicker } });
                                        if (date) {
                                            const timeString = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
                                            week_dispatch({ type: "updateValue", payload: { day: item.day, field: "open", value: timeString  } });
                                        }
                                    }}
                                />
                            </>
                        )}   
                        {
                            console.log(item.open)
                        }
                </View>

                    <View style={{flex:0.3, height:95,  justifyContent:"center", alignItems:"center"}}>
                    
                    {item.status!=false &&
                        <TouchableOpacity onPress={()=>
                                week_dispatch({type:"updateValue", payload:{day:item.day, field:"closePicker", value:!item.closePicker}})
                            } style={styles.button} underlayColor="transparent">
                                <Text style={styles.buttonText}>{item.close}</Text>
                            </TouchableOpacity>
                      }
                        {(item.closePicker) && (
                            <>
                                <DateTimePicker
                                    mode="time"
                                    is24Hour={true}
                                    display="clock"
                                    value= {new Date()}
                                    onChange={(event, date)=>{
                                        week_dispatch({ type: "updateValue", payload: { day: item.day, field: "closePicker", value: !item.closePicker } });
                                        if (date) {
                                            const timeString = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
                                    
                                            week_dispatch({ type: "updateValue", payload: { day: item.day, field: "close", value: timeString  } });
                                        }
                                    }}
                                />
                            </>
                        )}    
    
            
                    </View>
                
         
                            
             
    </View>
    
    );
    }



  return (
    <>
      

        <View style={{backgroundColor:"#Cecece",color:"white", flex:1, paddingBottom:10}}>
            <View style={{paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#F9E9A2"}}>
                <Text style={{fontSize:15, fontWeight:"bold",color:"#56000c"}}>Informação de Horários</Text>
            </View>      
    
            <View style={{flexDirection:"row",paddingVertical:5,justifyContent:"center", alignItems:"center",backgroundColor:"white",}}>
                <View style={{flex:0.3, borderLeftColor:"#E5e6e6", borderLeftWidth:2}}>
                    <Text style={{textAlign:"center", fontSize:16, fontWeight:"bold"}}>Dia da Semana</Text>
                </View>
                <View style={{flex:0.2}}>
                    <Text style={{textAlign:"center", fontSize:16, fontWeight:"bold"}}>Aberto?</Text>
                </View>
                <View style={{flex:0.25}}>
                    <Text style={{textAlign:"center", fontSize:16, fontWeight:"bold"}}>Hora de Abertura</Text>
                </View>
                <View style={{flex:0.25}}>
                    <Text style={{textAlign:"center", fontSize:16, fontWeight:"bold"}}>Hora de  Fecho</Text>
                </View>

            </View>
            <FlatList
                data={weekDays}
                renderItem={renderItem}
                keyExtractor={(item) => item.day}
               
            />
            
                    
            <View style={{flexDirection:"row"}}>
            <View style={{flex:1}}>
                    <Button_1 title="Voltar atrás" onPress={onPressBack} color="#d1863c"></Button_1>
                </View>
                <View style={{flex:1}}>
                    <Button_1 title="Próximo"  color="#308aa0" onPress={onPressForward}></Button_1>
                </View>
            
            </View>
    
        </View>
    </>
  )
};

export default WeekSchedule;

const styles = StyleSheet.create({
    container:{       
        paddingLeft:10,
        borderRadius:8, 
        height:50, 
        shadowColor: '#56000c',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor:"white",
        fontSize:17,
    
    },
    dayContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    dayText: {
      flex: 1,
      fontSize: 16,
    },
    textInput: {
      flex: 2,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText1: {
      color: 'white',
      fontSize: 16,
    },
    button:{
        backgroundColor:"#6FCF97",
        padding:15,
        width:70,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:8,
    },
    buttonText:{
        fontSize:15,
        fontWeight:"bold",
        color:"white",
    },
  });