import { mount } from '@vue/test-utils'
import LoginView from '@/views/LoginView.vue'

describe('Login site test',  () => {
  test('User input test', async () => {
    const wrapper = mount(LoginView)
    const input = wrapper.find('input[type="text"]') 
    await input.setValue('Galiga')
    expect(wrapper.vm.userName).toBe('Galiga')
    })
    
    test('Password input test', async () => {
      const wrapper = mount(LoginView)
      const input = wrapper.find('input[type="password"]') 
      await input.setValue('pass')
      expect(wrapper.vm.password).toBe('pass')
  })

  test('Login title exists', () => {
    const wrapper = mount(LoginView)
    const text = wrapper.find('[class="text"]').text()
    expect(text).toBe('Login')
  })

  test('Sign up button exists', () => {
    const wrapper = mount(LoginView)
    const text = wrapper.find('button').text()
    expect(text).toBe('Sign in')
  })
})
