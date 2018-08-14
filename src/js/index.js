import leftPad from './leftpad';
//import '../scss/main.scss';

const serNos = [6934, 23111, 23114, 1001, 211161, 'abc'];
const strSNos = serNos.map(sn => leftPad(sn, 8, '0'));
console.log(strSNos);