import { AscendingOrderPipe } from './ascending-order.pipe';

describe('Pipe: ascending-order', () => {
  let pipe: AscendingOrderPipe;

  beforeEach(() => {
    pipe = new AscendingOrderPipe();
  });

  it('should sort a list of strings in ascending order', () => {
    let value: Array<string> = ['Hal Jordan', 'Jade', 'Guy Gardner', 'Kyle Raynor', 'John Stewart', 'Sinestro', 'Alan Scott', 'Simon Baz'];
    expect(pipe.transform(value)).toBe('Alan Scott, Guy Gardner, Hal Jordan, Jade, John Stewart, Kyle Raynor, Simon Baz, Sinestro');
  });

  it('should show the one value of the input', () => {
    let value: Array<string> = ['Bruce Wayne']
    expect(pipe.transform(value)).toBe('Bruce Wayne')
  });

});