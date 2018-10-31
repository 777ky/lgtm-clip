#!/usr/bin/env node
'use strict';
const prompts = require('prompts');
const clipboardy = require('clipboardy');

let opt = '';
let action = '';
let lgtms = [];
let lgtm = [];
let select = 0;

if(process.argv.length > 2) {
  // オプションが2つ以上ある場合：終了
  if(process.argv.length > 4) {
    console.log('引数が多すぎです\nUsage: lgtm [-option[m,n]] [list]');
    return;

  }else {
  // if(process.argv.length > 3) {
    if(!(process.argv[2].match(/^\-/i))) {
      // 第1オプションに[-]が付いていない場合：終了
      console.log('オプションが間違っています。\nUsage: lgtm [-option[m,n]] [list]');
      return;
    }else{
      opt = process.argv[2];

      // 第2オプションがありlistの場合
      if(process.argv[3]){
        if(process.argv[3] !== 'list'){
          console.log('オプションが間違っています。\nUsage: lgtm [-option[m,n]] [list]');
          return;
        }
        action = process.argv[3];
      }
    }
  }

}else{
  // オプションなしの場合
  opt = '-d';
}

function clipLgtm(lgtm){
  console.log('!['+lgtm.keyword+']('+lgtm.url+')');
  clipboardy.writeSync('!['+lgtm.keyword+']('+lgtm.url+')');
}

function getLgtm(json, start, end, opt){
  const obj = require('./config/'+json);
  let lgtm = [];

  // 引数なしの場合
  if(start === void 0 || end === void 0){

    // 引数なしの場合はランダムなlgtmを返却
    lgtm.push(obj[Math.floor(Math.random() * obj.length)])

  }else{

    if(start < 0 && end < 0){
      // -1,-1の場合は先頭のみのobj取得
      lgtm.push(obj[0]);
    }else{
      if(start < 0){
        // -1,xの場合
        // ランダム開始位置からend個をランダムに取得
        start = Math.floor(Math.random() * (obj.length - end));

        for(let i=0; i<end; i++){
          lgtm.push(obj[start+i]);
        }

      }else if(end < 0){
        // x,-1の場合
        // 一覧全取得
        lgtm = obj;
      }else{
        // x,xの場合
        // start位置からend個をランダムに取得にする
        for(let i=0; i<end; i++){
          lgtm.push(obj[start+i]);
        }
      }

    }
  }
  return lgtm;
}

async function selectLgtm(lgtms){
  let select = [
    {
      type: 'select',
      name: 'index',
      message: 'select LGTM!!!',
      choices: lgtms
    }
  ];
  return await prompts(select);
};

switch(opt){
case '-d':
  // default
  lgtm = getLgtm('engineer_homeru_neko.json',-1,-1);
  lgtm[0].keyword = lgtm[0].keywords[0];
  clipLgtm(lgtm[0]);
  break;

case '-m':
  if(action!==''){
    lgtms = getLgtm('meigens.json',-1,10);
    lgtms.map((lg, idx)=>{
      lg.title = lg.title + ':' + lg.body.replace(/\r?\n/g, '');
      lg.value = idx;
    });

    selectLgtm(lgtms).then((select)=>{
      lgtm = lgtms.filter((element, index, array)=>{
        if(index === select.index){
          return true;
        }
      });
      lgtm[0].url = lgtm[0].image.replace('http://', 'https://');
      lgtm[0].keyword = lgtm[0].title.split(':')[0];

      clipLgtm(lgtm[0]);
    });

  }else{
    lgtm = getLgtm('meigens.json');
    lgtm[0].url = lgtm[0].image.replace('http://', 'https://');
    lgtm[0].keyword = lgtm[0].title;
    clipLgtm(lgtm[0]);
  }
  break;

case '-n':
  if(action!==''){
    // 最初から最後までの一覧
    // lgtms = getLgtm('engineer_homeru_neko.json',0,-1);
    // 最初から10個
    lgtms = getLgtm('engineer_homeru_neko.json',0,10);
    lgtms.map((lg, idx)=>{
      lg.title = lg.keywords[0];
      lg.value = idx;
    });

    selectLgtm(lgtms).then((select)=>{
      lgtm = lgtms.filter((element, index, array)=>{
        if(index === select.index){
          return true;
        }
      });
      lgtm[0].keyword = lgtm[0].title;
      clipLgtm(lgtm[0]);
    });

  }else{
    lgtm = getLgtm('engineer_homeru_neko.json');
    lgtm[0].keyword = lgtm[0].keywords[0];
    clipLgtm(lgtm[0]);
  }
  break;

case '-s':
  if(action!==''){

    // 最初から最後までの一覧
    // lgtms = getLgtm('sushi_list.json',0,-1);
    // 最初から10個
    lgtms = getLgtm('sushi_list.json',0,10);
    lgtms.map((lg, idx)=>{
      lg.title = lg.keywords[0];
      lg.value = idx;
    });

    selectLgtm(lgtms).then((select)=>{
      lgtm = lgtms.filter((element, index, array)=>{
        if(index === select.index){
          return true;
        }
      });
      lgtm[0].keyword = lgtm[0].title;
      clipLgtm(lgtm[0]);
    });

  }else{
    lgtm = getLgtm('sushi_list.json');
    lgtm[0].keyword = lgtm[0].keywords[0];
    clipLgtm(lgtm[0]);
  }
  break;

default:
  console.log('オプション間違いです。\nUsage: lgtm [-option[s,m,n]]');
  return;
}

