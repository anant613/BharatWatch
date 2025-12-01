/* Container styles */
.main-container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 100vh;
}

@media (max-width: 900px) {
  .snips-container {
    flex-wrap: wrap;           /* Wrap snips in multiple rows */
    gap: 0.5rem;
  }
  .categories {
    flex-wrap: wrap;           /* Category buttons on two lines */
    justify-content: center;
    gap: 0.5rem;
  }
  .recommended-videos {
    grid-template-columns: 1fr 1fr;  /* Two columns for tablets */
  }
}

@media (max-width: 600px) {
  .main-container {
    padding: 1rem;
  }
  .recommended-videos {
    grid-template-columns: 1fr;      /* One column for mobile */
  }
  .snips-container {
    overflow-x: auto;                /* Horizontal scroll for avatars */
    flex-wrap: nowrap;
  }
  .categories {
    flex-direction: column;
    align-items: stretch;
  }
}
