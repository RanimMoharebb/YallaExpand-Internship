# Debounce Test

## Test Code

```javascript
for (let i = 0; i < 10; i++) {
    debouncedSave(task);
}
```

Although `debouncedSave()` is called ten times in rapid succession, only one API request is sent.

### Expected Output

```text
Calling save rapidly...

Done

Saved: Learn Debounce
```

This proves that the debounce implementation delays execution until the rapid calls stop, preventing unnecessary API requests.


