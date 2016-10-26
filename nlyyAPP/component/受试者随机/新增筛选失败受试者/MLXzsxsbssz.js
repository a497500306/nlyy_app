
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    ListView,
    Alert,
    DatePickerAndroid,
    TouchableHighlight,
    DatePickerIOS,
    Picker,
    ActivityIndicator,

} from 'react-native';
//时间操作
var moment = require('moment');
moment().format();

import Pickers from 'react-native-picker';

// var Modal = require('react-native-modal');
var Users = require('../../../entity/Users')
var MLModal = require('../../MLModal/MLModal');
var study = require('../../../entity/study');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var settings = require('../../../settings');
var MLNavigatorBar = require('../../MLNavigatorBar/MLNavigatorBar');
var MLTableCell = require('../../MLTableCell/MLTableCell');
var XzsxsbsszQR = require('./MLXzsxsbsszQR');

var Xzsxsbssz = React.createClass({

    getInitialState() {
        var tableData = [];

        tableData.push('筛选失败原因A')
        tableData.push('筛选失败原因B')
        tableData.push('筛选失败原因C')
        tableData.push('筛选失败原因D')
        tableData.push('受试者出生日期')
        tableData.push('受试者性别')
        tableData.push('受试者姓名缩写')
        if (study.study.SubStudYN == 1){
            tableData.push('受试者是否参加子研究')
        }
        tableData.push('筛选结果')
        tableData.push('')

        //ListView设置
        var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});

        let date = [];
        for(let i=1900;i<2050;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k);
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k);
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k);
                    }
                }
                let _month = {};
                _month[j] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i] = month;
            date.push(_date);
        }

        return {
            //ListView设置
            tableData : tableData,
            dataSource: ds.cloneWithRows(tableData),
            xxa:'',
            xxb:'',
            xxc:'',
            xxd:'',
            //ListView设置
            animating: false,
            //是否显示选择器
            isLanguage : false,
            //选择器默认选择值
            language:'',
            //选择器内容数组
            languages:['javar','jss'],
            date : date,
            yydata : ['不良事件','完成研究','死亡','缺乏疗效','失访','研究用药依从性差','医生决定','怀孕','疾病进展','违反方案','疾病康复','筛选失败',
            '申办方终止研究','技术问题','受试者决定退出','其他'],
            //出生年月
            csDate:'',
            //受试者性别
            xb:'',
            //输入的第几个
            shuru:0,
            //姓名缩写
            name:'',
            //受试者手机号
            phone:'',
            //是否参加子研究
            zyj:'',
            //是否显示moda
            isModalOpen:false,
            //输入框显示文字
            srkxswz:['']
        }
    },
    closeModal() {
        this.setState({isModalOpen: false});
    },
    render() {
        console.log('11111')
        if (this.state.isLanguage == false){
            return (
                <View style={styles.container}>
                    <MLNavigatorBar title={'新增筛选失败受试者'} isBack={true} backFunc={() => {
                        Pickers.hide();
                        this.props.navigator.pop()
                    }}/>
                    <ListView
                        dataSource={this.state.dataSource}//数据源
                        renderRow={this.renderRow}
                    />
                    {/*<Modal isVisible={this.state.isModalOpen} onClose={() => this.closeModal()}>*/}
                    {/*<Text>Hello world!</Text>*/}
                    {/*</Modal>*/}
                    <MLModal placeholders={this.state.srkxswz} isVisible={this.state.isModalOpen}
                             onClose={(text) => {
                                 //ListView设置
                                 var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                                 if (this.state.shuru == 0){
                                     this.setState({name:text,dataSource: ds.cloneWithRows(this.state.tableData),isModalOpen:false,srkxswz:['受试者姓名缩写']})
                                 }else{
                                     this.setState({phone:text,dataSource: ds.cloneWithRows(this.state.tableData),isModalOpen:false,srkxswz:['受试者姓名缩写']})
                                 }
                             }}
                             quxiao={(text) => {
                                 this.setState({isModalOpen:false,srkxswz:['受试者姓名缩写']})
                             }}>></MLModal>
                </View>
            );
        }else{
            return (
                <View style={styles.container}>
                    <MLNavigatorBar title={'新增筛选成功受试者'} isBack={true} backFunc={() => {
                        this.props.navigator.pop()
                    }}/>
                    <ListView
                        dataSource={this.state.dataSource}//数据源
                        renderRow={this.renderRow}
                    />
                    <MLModal placeholders={this.state.srkxswz} isVisible={this.state.isModalOpen}
                             onClose={(text) => {
                                 //ListView设置
                                 var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                                 if (this.state.shuru == 0){
                                     this.setState({name:text,dataSource: ds.cloneWithRows(this.state.tableData),isModalOpen:false,srkxswz:['受试者姓名缩写']})
                                 }else{
                                     this.setState({phone:text,dataSource: ds.cloneWithRows(this.state.tableData),isModalOpen:false,srkxswz:['受试者姓名缩写']})
                                 }
                             }}
                             quxiao={(text) => {
                                 this.setState({isModalOpen:false,srkxswz:['受试者姓名缩写']})
                             }}>></MLModal>
                    <View style={{position:'absolute', right:0, bottom:0, width:width, height:height, backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <Picker
                            selectedValue={this.state.language}
                            onValueChange={(lang) => this.setState({language: lang})}>
                            {this.PickerItem()}
                        </Picker>
                    </View>
                </View>
            );
        }
    },
    PickerItem(){
        var views = [];
        for (var i = 0 ; i < this.state.languages.length ; i++) {
            views.push(<Picker.Item label={this.state.languages[i]} key={i} value="java" />)
        }
        return views
        // <Picker.Item label="Java" value="java" />
        // <Picker.Item label="JavaScript" value="js" />
    },
    //返回具体的cell
    renderRow(rowData){
        if (rowData == "筛选失败原因A") {
            return(
                <TouchableOpacity onPress={()=>{
                    Pickers.init({
                        pickerData: this.state.yydata,
                        onPickerConfirm: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xxa:pickedValue[0],
                                dataSource: ds.cloneWithRows(this.state.tableData),})

                        },
                        onPickerCancel: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xxa:'',dataSource: ds.cloneWithRows(this.state.tableData),})
                        },
                        onPickerSelect: pickedValue => {
                        }
                    });
                    Pickers.show();
                }}>
                    <MLTableCell title={rowData} rightTitle={this.state.xxa}/>
                </TouchableOpacity>
            )
        }
        if (rowData == "筛选失败原因B") {
            return(
                <TouchableOpacity onPress={()=>{
                    Pickers.init({
                        pickerData: this.state.yydata,
                        onPickerConfirm: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xxb:pickedValue[0],
                                dataSource: ds.cloneWithRows(this.state.tableData),})

                        },
                        onPickerCancel: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xxb:'',dataSource: ds.cloneWithRows(this.state.tableData),})
                        },
                        onPickerSelect: pickedValue => {
                        }
                    });
                    Pickers.show();
                }}>
                    <MLTableCell title={rowData} rightTitle={this.state.xxb}/>
                </TouchableOpacity>
            )
        }
        if (rowData == "筛选失败原因C") {
            return(
                <TouchableOpacity onPress={()=>{
                    Pickers.init({
                        pickerData: this.state.yydata,
                        onPickerConfirm: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xxc:pickedValue[0],
                                dataSource: ds.cloneWithRows(this.state.tableData),})

                        },
                        onPickerCancel: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xxc:'',dataSource: ds.cloneWithRows(this.state.tableData),})
                        },
                        onPickerSelect: pickedValue => {
                        }
                    });
                    Pickers.show();
                }}>
                    <MLTableCell title={rowData} rightTitle={this.state.xxc}/>
                </TouchableOpacity>
            )
        }
        if (rowData == "筛选失败原因D") {
            return(
                <TouchableOpacity onPress={()=>{
                    Pickers.init({
                        pickerData: this.state.yydata,
                        onPickerConfirm: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xxd:pickedValue[0],
                                dataSource: ds.cloneWithRows(this.state.tableData),})

                        },
                        onPickerCancel: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xxd:'',dataSource: ds.cloneWithRows(this.state.tableData),})
                        },
                        onPickerSelect: pickedValue => {
                        }
                    });
                    Pickers.show();
                }}>
                    <MLTableCell title={rowData} rightTitle={this.state.xxd}/>
                </TouchableOpacity>
            )
        }
        if(rowData == "受试者出生日期") {
            return(
                <TouchableOpacity onPress={()=>{
                    Pickers.init({
                        pickerData: this.state.date,
                        onPickerConfirm: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({csDate:pickedValue[0] + '/' + pickedValue[1] + '/' + pickedValue[2],
                                dataSource: ds.cloneWithRows(this.state.tableData),})

                        },
                        onPickerCancel: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({csDate:'',dataSource: ds.cloneWithRows(this.state.tableData),})
                        },
                        onPickerSelect: pickedValue => {
                        }
                    });
                    Pickers.show();
                }}>
                    <MLTableCell title={rowData} rightTitle={this.state.csDate}/>
                </TouchableOpacity>
            )
        }
        if(rowData == "受试者性别") {
            return(
                <TouchableOpacity onPress={()=>{
                    var data = ['男','女'];
                    Pickers.init({
                        pickerData: data,
                        selectedValue: ['男'],
                        onPickerConfirm: pickedValue => {

                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xb:pickedValue[0],dataSource: ds.cloneWithRows(this.state.tableData),})
                        },
                        onPickerCancel: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({xb:'',dataSource: ds.cloneWithRows(this.state.tableData),})
                        },
                        onPickerSelect: pickedValue => {
                            console.log('area', pickedValue[0]);

                        }
                    });
                    Pickers.show();
                }}>
                    <MLTableCell title={rowData} rightTitle={this.state.xb}/>
                </TouchableOpacity>
            )
        }
        if (rowData == '受试者姓名缩写'){
            return(
                <TouchableOpacity onPress={()=>{
                    Pickers.hide();
                    this.setState({isModalOpen:true,srkxswz:['受试者姓名缩写'],shuru:0})
                }}>
                    <MLTableCell title={rowData} rightTitle={this.state.name}/>
                </TouchableOpacity>
            )
        }

        if (rowData == '受试者手机'){
            return(
                <TouchableOpacity onPress={()=>{
                    Pickers.hide();
                    this.setState({isModalOpen:true,srkxswz:['受试者手机'],shuru:1})
                }}>
                    <MLTableCell title={rowData} rightTitle={this.state.phone}/>
                </TouchableOpacity>
            )

        }
        if (rowData == '受试者是否参加子研究'){
            return(
                <TouchableOpacity onPress={()=>{
                    var data = ['是','否'];
                    Pickers.init({
                        pickerData: data,
                        selectedValue: ['是'],
                        onPickerConfirm: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({zyj:pickedValue[0],dataSource: ds.cloneWithRows(this.state.tableData),})
                        },
                        onPickerCancel: pickedValue => {
                            //ListView设置
                            var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                            this.setState({zyj:'',dataSource: ds.cloneWithRows(this.state.tableData),})
                        },
                        onPickerSelect: pickedValue => {

                        }
                    });
                    Pickers.show();
                }}>
                    <MLTableCell title={rowData} rightTitle={this.state.zyj}/>
                </TouchableOpacity>
            )
        }
        if (rowData == '筛选结果'){
            return(
                <MLTableCell title={rowData} rightTitle='失败' isArrow={false}/>
            )
        }
        if (rowData == ''){
            return(
                <View>
                    <TouchableOpacity style={styles.dengluBtnStyle} onPress={this.getLogin}>
                        <Text style={{color:'white',fontSize: 14,marginLeft:15}}>
                            确 定
                        </Text>
                        <ActivityIndicator
                            animating={this.state.animating}
                            style={[styles.centering, {height: 30}]}
                            size="small"
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    },
    getLogin(){
        if (this.state.csDate.length == 0){
            //错误
            Alert.alert(
                '出生年月为空',
                null,
                [
                    {text: '确定'}
                ]
            )
            return
        }
        if (this.state.xb.length == 0){
            //错误
            Alert.alert(
                '性别为空',
                null,
                [
                    {text: '确定'}
                ]
            )
            return
        }
        if (this.state.name.length == 0){
            //错误
            Alert.alert(
                '姓名缩写为空',
                null,
                [
                    {text: '确定'}
                ]
            )
            return
        }
        this.setState({
            animating: true
        })
        var UserSite = '';
        for (var i = 0 ; i < Users.Users.length ; i++) {
            if (Users.Users[i].UserSite != null) {
                UserSite = Users.Users[i].UserSite
            }
        }
        //获取中心数据网络请求
        fetch(settings.fwqUrl + "/app/getSingleSite", {
            method: 'POST',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                StudyID: Users.Users[0].StudyID,
                UserSite:UserSite
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    animating: false
                })
                if (responseJson.isSucceed == 200){
                    //错误
                    Alert.alert(
                        responseJson.msg,
                        null,
                        [
                            {text: '确定'}
                        ]
                    )
                }else {
                    // 页面的切换
                    this.props.navigator.push({
                        component: XzsxsbsszQR, // 具体路由的版块
                        //传递参数
                        passProps:{
                            //受试者性别
                            xb:this.state.xb,
                            //姓名缩写
                            name:this.state.name,
                            //新增筛选失败A
                            xxa:this.state.xxa,
                            //新增筛选失败B
                            xxb:this.state.xxb,
                            //新增筛选失败C
                            xxc:this.state.xxc,
                            //新增筛选失败D
                            xxd:this.state.xxd,
                            //出生日期
                            csDate:this.state.csDate,
                            //中心数据
                            site:responseJson.site
                        }
                    });
                }
            })
            .catch((error) => {//错误
                this.setState({
                    animating: false
                })
                this.setState({animating:false});
                console.log(error),
                    //错误
                    Alert.alert(
                        '请检查您的网络111',
                        null,
                        [
                            {text: '确定'}
                        ]
                    )
            });
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    xiantiaoViewStyle:{
        width: 42,
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    zongView: {
        backgroundColor: 'white',
        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center'
    },
    dengluBtnStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        // 设置主轴的对齐方式
        justifyContent:'center',
        width:width - 40,
        marginTop:20,
        marginLeft:20,
        height:40,
        backgroundColor:'rgba(0,136,212,1.0)',
        // 设置圆角
        borderRadius:5,
    },
});

// 输出组件类
module.exports = Xzsxsbssz;
