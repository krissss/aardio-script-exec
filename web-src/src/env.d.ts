/// <reference types="vite/client" />
/// <reference types="element-plus/global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const aardio: Aardio
interface Aardio {
  // 文件或路劲选择
  file_choose(文件类型: string, 标题: string): Promise<string>
  // 记录保存
  cmd_history_save(json: string): Promise<void>
  // 记录获取
  cmd_history_get(): Promise<string>
  // 执行 cmd
  cmd_exec(cmd: string, title: string): Promise<void>
}

// stores

interface CMD {
  [k: string]: any,
  name: string
  dir: string
  exe: string
  script: string
  params: string
}

interface CMDState {
  isExec: boolean,
  current: CMD,
  history: {[key: string]: CMD}
}
