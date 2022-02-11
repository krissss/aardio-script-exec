import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

const inner = {
  async saveToAardio(data) {
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
    }
  },
  getters: {
    name: (state) => state.current.name,
    cmd: (state) => {
      let params = [state.current.exe, state.current.script, state.current.params]
      if (state.current.dir) {
        params = ['cd', state.current.dir, ';'].concat(params)
      }
      return params.filter(item => item).join(' ')
    },
  },
  actions: {
    async exec(data) {
      this.save(data)
      await aardio.cmd_exec(this.cmd, this.name)
    },
    save(data) {
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
    async loadHistory() {
      let data = await aardio.cmd_history_get()
      console.log(data)
      if (data) {
        data = JSON.parse(data)
        this.history = data
        return
      }
    },
    useHistory(index) {
      this.current = this.history[index]
      this.isExec = false
    },
    delHistory(index) {
      delete this.history[index]
      inner.saveToAardio(this.history)
    }
  }
})
