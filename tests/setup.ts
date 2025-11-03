import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// 清理 DOM 测试环境
afterEach(() => {
  cleanup()
})