import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

// 一个简单的测试组件
function TestComponent() {
  return <div data-testid="test-element">Hello Vitest!</div>
}

describe('TestComponent', () => {
  it('should render correctly', () => {
    render(<TestComponent />)
    expect(screen.getByTestId('test-element')).toBeInTheDocument()
    expect(screen.getByText('Hello Vitest!')).toBeInTheDocument()
  })
})