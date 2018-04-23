import { isTel,isURL, isMobile, isIdCardNum } from './validate'


function vali(checkFunc, message='不合法的输入') {
    if (!checkFunc || typeof checkFunc !== 'function') {
        return;
    }
    return (rule, value, callback) => {        
        if(value != null && value != "") {
            if(!checkFunc(value)) {
                callback(new Error(message))
            } else {
                callback()
            }
        }
        else{
            callback();
        }
    }
}

export default {
    install(Vue, options) {
        /**
         * 参数 item 
         * required true  必填项
         * maxLength  字符串的最大长度
         * min 和 max 必须同时给 min < max  type=number
         * type 手机号 mobile
         *      邮箱   email
         *      身份证号   IdCard
         *      网址   url
         *      ...
         * */
        
        Vue.prototype.form_rules = function (item) {
            let rules = [];
            if (item.required) {
                rules.push({ required: true, message: '必填', trigger: 'blur' });
            }
            if (item.maxLength) {
                rules.push({ min: 1, max: item.maxLength, message: '最多输入' + item.maxLength + '个字符!', trigger: 'blur' })
            }
            if (item.min && item.max) {
                rules.push({ min: item.min, max: item.max, message: '字符长度在' + item.min + '至' + item.max + '之间!', trigger: 'blur' })
            }
            if (item.type) {
                let type = item.type;
                switch (type) {
                    case 'email':
                        rules.push({ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' });
                        break;
                    case 'mobile':
                        rules.push( { validator:vali(isMobile,'手机号码格式不正确')});
                        break;
                    case 'IdCard':
                        rules.push( { validator:vali(isIdCardNum,'身份证号码不合法')});
                        break;
                    case 'url':
                        rules.push( { validator: vali(isURL,'链接地址不合法')});
                        break;
                    default:
                        rule.push({});
                        break;
                }
            }
            return rules;
        };
    }
};