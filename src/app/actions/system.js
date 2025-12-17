import action from '../library/action'

import { adminPage, adminName, defaultRoot, host } from 'Config'

// 不用改
export const NODE_ENV = process.env.NODE_ENV
export const DEFAULT_ROOT = defaultRoot === '/' ? '' : defaultRoot
export const ADMIN_ROOT = `${DEFAULT_ROOT}${adminName}`
export const ADMIN_PATH = `${ADMIN_ROOT}${adminPage}`
