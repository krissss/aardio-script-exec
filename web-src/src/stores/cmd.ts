import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

const inner = {
  async saveToAardio(data: object) {
    await aardio.cmd_history_save(JSON.stringify(data))
  }
}

export const useStore = defineStore('cmd', {
  state: () => {
    return {
      isExec: false,
      current: {
        name: '',
        dir: '',
        exe: '',
        script: '',
        params: '',
      },
      history: {}
    } as CMDState
  },
  getters: {
    name(state): string {
      return state.current.name
    },
    cmd(state): string {
      let params = [state.current.exe, state.current.script, state.current.params]
      if (state.current.dir) {
        params = ['cd', state.current.dir, ';'].concat(params)
      }
      return params.filter(item => item).join(' ')
    },
  },
  actions: {
    async exec(data: CMD): Promise<void> {
      this.save(data)
      await aardio.cmd_exec(this.cmd, this.name)
    },
    save(data: CMD): void {
      if (Object.values(data).filter(item => item).length <= 0) {
        ElMessage.error('至少设置一个值')
        return
      }

      this.isExec = false
      this.current = data
      if (!this.current.name) {
        this.current.name = this.cmd
      }

      this.history[this.current.name] = this.current
      inner.saveToAardio(this.history)
    },
    async loadHistory(): Promise<void> {
      let data = await aardio.cmd_history_get()
      if (data) {
        const list = JSON.parse(data)
        this.history = list
        return
      }
    },
    useHistory(index: string|number): void {
      this.current = this.history[index]
      this.isExec = false
    },
    delHistory(index: string|number): void {
      delete this.history[index]
      inner.saveToAardio(this.history)
    }
  }
})
