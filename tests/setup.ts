import { expect, afterEach } from 'vitest'
import { cleanup } from '@vue/test-utils'
import '@testing-library/jest-dom/vitest'

// 각 테스트 후 정리
afterEach(() => {
  cleanup()
})