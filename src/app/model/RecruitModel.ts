import Model from '../../core/Model';
import { AuthManager } from '../mixin/model/auth-manager';

export default class RecruitModel extends AuthManager(Model) {}
