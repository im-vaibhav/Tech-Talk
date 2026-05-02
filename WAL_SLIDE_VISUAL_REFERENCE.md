# Write-Ahead Log (WAL) Slide - Visual Structure

## Slide 9: WAL Solution (`/wal`)

```
┌─────────────────────────────────────────────────────────────────────┐
│  RELIABILITY · SOLUTION 2 OF 2                                      │
│                                                                     │
│  Write-Ahead Log (WAL)                                             │
│  Log intent first. Crash between log and commit? Recoverable.      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Part A: Write Path                                                │
│  Intent is logged BEFORE data is written                           │
│                                                                     │
│  💻         ①Log →      📝          ②Write →      💾               │
│  Client  ──────────►   WAL      ───────────►   Data Store          │
│  X=99               LSN:42                    Key:X, Val:99         │
│                     X=99                                            │
│                          ◄──────────────────────────                │
│                              ③Success                               │
│                                                                     │
│  ✓ Intent logged in WAL. Safe to acknowledge.                      │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Part B: Crash Recovery                                            │
│  Node restarts and replays missing operations                      │
│                                                                     │
│  ⚡           Restart →   📸        Replay →    📝      Done →  ✓  │
│  Node     ──────────►  Snapshot  ──────────►  WAL   ──────────►Node │
│  Crashed              LSN:40                LSN:41,42          X=99 │
│                       A=10,B=20             C=30,X=99      Recovered│
│                                                                     │
│  ✓ Crash happened between log and commit. Data recovered from WAL. │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐  ┌────────────────────┐  ┌──────────────────┐│
│  │ Append-Only     │  │ Periodic Snapshots │  │ Idempotent Replay││
│  │                 │  │                    │  │                  ││
│  │ Sequential      │  │ Save state at LSN  │  │ Applying same    ││
│  │ writes are      │  │ checkpoints. Only  │  │ operation twice  ││
│  │ faster than     │  │ replay WAL entries │  │ yields same      ││
│  │ random.         │  │ after last snap.   │  │ result.          ││
│  └─────────────────┘  └────────────────────┘  └──────────────────┘│
│                                                                     │
│  "Before making any change, write it in your diary..."             │
│                                                      [EPAM Logo]    │
│                                                                     │
│  ◄ Prev (8/10)                                      Next (10/10) ► │
└─────────────────────────────────────────────────────────────────────┘
```

## Color Coding

### Part A (Write Path)
- **Client:** Teal border, card background
- **Arrows:** Teal gradient with flow animation
- **WAL:** Teal border with glow effect
- **Data Store:** Teal border with glow effect
- **Success message:** Teal accent box

### Part B (Crash Recovery)
- **Crashed Node:** Orange border, grayscale filter, lightning bolt
- **Restart arrows:** Teal gradient with flow animation
- **Snapshot:** Subtle teal border
- **WAL:** Teal border with strong glow
- **Recovered Node:** Bright teal border with glow
- **Success message:** Teal accent box

### Info Cards
- Border: Teal (subtle opacity)
- Background: Card with backdrop blur
- Text: Teal headers, muted body text

## Animation Sequence (33+ seconds)

### Part A Timeline (0-17s)
1. **0-2s:** Header fades in
2. **2-5s:** Part A label + client appears
3. **5-7s:** Write request shown
4. **7-9s:** Arrow flows to WAL, WAL entry appears
5. **9-11s:** Arrow flows to data store
6. **11-13s:** Data store entry appears
7. **13-15s:** Success arrow flows back
8. **15-17s:** Success message appears

### Part B Timeline (17-34s)
9. **17-19s:** Divider + Part B label
10. **19-20.5s:** Crashed node appears with lightning
11. **20.5-22s:** Restart arrow animates
12. **22-24s:** Snapshot box appears
13. **24-26s:** Snapshot data fills in
14. **26-28s:** Replay arrow animates
15. **28-30s:** WAL entries appear
16. **30-32s:** Final arrow to recovered node
17. **32-34s:** Recovered node appears with success
18. **34s+:** Info cards fade in

## Key Visual Elements

### Icons
- 💻 = Client computer
- 📝 = Write-Ahead Log (append-only)
- 💾 = Data Store (main storage)
- ⚡ = Crash/failure indicator
- 📸 = Snapshot
- ✓ = Success/recovered state

### Visual Hierarchy
1. **Headers:** Large, bold, teal gradient
2. **Section labels:** Teal, clear descriptions
3. **Components:** Cards with borders and glows
4. **Data flow:** Animated arrows with gradients
5. **Status messages:** Prominent boxes with borders
6. **Info cards:** Grid layout at bottom
7. **Quote:** Italic, subtle at bottom left
8. **Logo:** Bottom right corner

## Responsive Considerations
- Flexbox layout adapts to screen sizes
- Cards maintain consistent sizing
- Text remains readable on all devices
- Animations scale smoothly
- Spacing adjusts proportionally

## Accessibility
- Clear labels on all components
- Sufficient color contrast (teal on dark navy)
- Step numbers (①②③) for clear sequencing
- Descriptive text accompanies all visuals
- Logical tab order through content
- Animation doesn't rely on motion alone

---

This slide effectively demonstrates how Write-Ahead Logs provide durability guarantees in distributed systems by logging intent before applying changes, enabling recovery from crashes that occur mid-operation.
