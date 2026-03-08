import { AscendingOrderPipe } from './ascending-order.pipe';

describe('AscendingOrderPipe', () => {
  let pipe: AscendingOrderPipe;

  beforeEach(() => {
    pipe = new AscendingOrderPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort array alphabetically', () => {
    expect(pipe.transform(['Charlie', 'Alice', 'Bob'])).toBe('Alice, Bob, Charlie');
  });

  it('should return single item without separator', () => {
    expect(pipe.transform(['Solo'])).toBe('Solo');
  });

  it('should return empty string for empty array', () => {
    expect(pipe.transform([])).toBe('');
  });

  it('should sort case-sensitively (uppercase before lowercase)', () => {
    const result = pipe.transform(['bob', 'Alice']);
    expect(result).toBe('Alice, bob');
  });

  it('should join multiple items with comma and space', () => {
    const result = pipe.transform(['Z', 'A', 'M']);
    expect(result).toContain(', ');
    expect(result.startsWith('A')).toBeTrue();
    expect(result.endsWith('Z')).toBeTrue();
  });
});
