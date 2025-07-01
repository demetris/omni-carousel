
Know your track width
================================================================================

Tecnhiques for controlling the width and height of responsive slides

```css
.track { container-type: inline-size; }
.slide { width: 100cqw; }
```

```css
:root {
  --width: 93.75vw;
  --space-x: calc((100vw - var(--width)) / 2);
}

@media (min-width: 864px) {
  :root {
    --width: 800px;
    --space-x: calc((100% - var(--width)) / 2);
  }
}

@media (min-width: 1024px) {
  :root {
    --width: 928px;
  }
}

@media (min-width: 1120px) {
  :root {
    --width: 1024px;
  }
}

@media (min-width: 1280px) {
  :root {
    --width: 1120px;
  }
}
