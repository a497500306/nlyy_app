/**
 * Created by maoli on 16/9/25.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    BackAndroid,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var MLNavigatorBar = React.createClass({
    //组件挂载的时候调用
    componentDidMount(){
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    },
    componentWillUnmount () {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    },

    handleBack(){
        var navigator = this.navigator;
        if (this.props.backFunc == undefined) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {

                //最近2秒内按过back键，可以退出应用。

                return false;

            }

            this.lastBackPressed = Date.now();

            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

            return true;
        }else{
            this.props.backFunc();
            return true;
        }
    },
    getDefaultProps(){
        return {
            title:"",
            newTitle:"",
            isBack:true,
            backFunc: Component.func,
            newFunc: Component.func
        }
    },
    render() {
        if (this.props.isBack == true){
            if (this.props.newTitle === ''){
                return (
                    <View>
                        <View style={styles.daohangIOSStyle}/>
                        <View style={styles.daohangStyle}>
                            <TouchableOpacity style={{position:'absolute', left:0, bottom:7}} onPress={this.props.backFunc}>
                                <Icon style={{marginLeft:15,marginRight:15}} name="angle-left" size={30} color="white" />
                            </TouchableOpacity>
                            <Text style={{color:'white',fontSize: 16}}>
                                {this.props.title}
                            </Text>
                        </View>
                    </View>
                );
            }else {
                return (
                    <View>
                        <View style={styles.daohangIOSStyle}/>
                        <View style={styles.daohangStyle}>
                            <TouchableOpacity style={{position:'absolute', left:0, bottom:7}} onPress={this.props.backFunc}>
                                <Icon style={{marginLeft:15,marginRight:15}} name="angle-left" size={30} color="white" />
                            </TouchableOpacity>
                            <Text style={{color:'white',fontSize: 16}}>
                                {this.props.title}
                            </Text>
                            <TouchableOpacity style={{position:'absolute', right:0, bottom:7}} onPress={this.props.newFunc}>
                                <Icon style={{marginLeft:15,marginRight:15}} name={this.props.newTitle} size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }
        }else{
            return (
                <View>
                    <View style={styles.daohangIOSStyle}/>
                    <View style={styles.daohangStyle}>
                        <Text style={{color:'white',fontSize: 16}}>
                            {this.props.title}
                        </Text>
                    </View>
                </View>
            );
        }
    },
});

const styles = StyleSheet.create({
    daohangStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        // 设置主轴的对齐方式
        justifyContent:'space-around',

        width:width,
        height:44,
        backgroundColor:'rgba(0,136,212,1.0)',
    },
    daohangIOSStyle:{
        width:width,
        height:Platform.OS == 'ios' ? 20 : 0,
        backgroundColor:'rgba(0,136,212,1.0)',
    },
});

// 输出组件类
module.exports = MLNavigatorBar;