declare module '*.module.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.mp4';

// -------------- custom origin --------------
declare type MutableObject<T = any> = { [key: string]: T };

// -------------- mixin --------------
declare type Constructor<T = any> = new (...args: any[]) => T;

// -------------- 롤 포지션 --------------
declare type RiotPosition = 'TOP' | 'JGL' | 'MID' | 'BOT' | 'SPT';
