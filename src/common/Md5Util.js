import md5 from 'js-md5'
export default {
    CalcuMD5: pwd => {
        return md5(pwd)
    }
}