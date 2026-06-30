import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrchidsData } from '../data/ListOfOrchids';

export const MOCK_API_URL = 'https://6a3096e2a7f8866418d627e1.mockapi.io/orchids';

// ─── Fetch ───────────────────────────────────────────────────────────────────
export const fetchOrchids = createAsyncThunk('orchids/fetchOrchids', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(MOCK_API_URL);
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(OrchidsData);
  }
});

// ─── Add ─────────────────────────────────────────────────────────────────────
export const addOrchid = createAsyncThunk('orchids/addOrchid', async (newOrchid, { rejectWithValue }) => {
  try {
    const response = await fetch(MOCK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrchid),
    });
    if (!response.ok) throw new Error('API Error');
    return await response.json();
  } catch (error) {
    return rejectWithValue({ ...newOrchid, id: Date.now().toString() });
  }
});

// ─── Update ──────────────────────────────────────────────────────────────────
export const updateOrchid = createAsyncThunk('orchids/updateOrchid', async (updatedOrchid, { rejectWithValue }) => {
  try {
    const response = await fetch(`${MOCK_API_URL}/${updatedOrchid.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedOrchid),
    });
    if (!response.ok) throw new Error('API Error');
    return await response.json();
  } catch (error) {
    return rejectWithValue(updatedOrchid);
  }
});

// ─── Delete ──────────────────────────────────────────────────────────────────
export const deleteOrchid = createAsyncThunk('orchids/deleteOrchid', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${MOCK_API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('API Error');
    return id;
  } catch (error) {
    return rejectWithValue(id);
  }
});

// ─── Toggle Like ──────────────────────────────────────────────────────────────
// payload: { orchidId, userEmail }
export const toggleLike = createAsyncThunk(
  'orchids/toggleLike',
  async ({ orchidId, userEmail }, { getState, rejectWithValue }) => {
    const orchid = getState().orchids.items.find((o) => String(o.id) === String(orchidId));
    if (!orchid) return rejectWithValue('Orchid not found');

    const likedBy = Array.isArray(orchid.likedBy) ? orchid.likedBy : [];
    const alreadyLiked = likedBy.includes(userEmail);

    const updatedLikedBy = alreadyLiked
      ? likedBy.filter((e) => e !== userEmail)      // unlike
      : [...likedBy, userEmail];                    // like

    const updatedOrchid = {
      ...orchid,
      likedBy: updatedLikedBy,
      numberOfLike: updatedLikedBy.length,
    };

    try {
      const response = await fetch(`${MOCK_API_URL}/${orchidId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrchid),
      });
      if (!response.ok) throw new Error('API Error');
      return await response.json();
    } catch {
      return rejectWithValue(updatedOrchid); // local fallback
    }
  }
);

// ─── Submit Feedback (Add or Edit) ───────────────────────────────────────────
// feedbackEntry: { rating, comment, author, date }
export const submitFeedback = createAsyncThunk(
  'orchids/submitFeedback',
  async ({ orchidId, feedbackEntry }, { getState, rejectWithValue }) => {
    const orchid = getState().orchids.items.find((o) => String(o.id) === String(orchidId));
    if (!orchid) return rejectWithValue('Orchid not found');

    const existing = Array.isArray(orchid.feedback) ? orchid.feedback : [];
    const alreadyIndex = existing.findIndex((f) => f.author === feedbackEntry.author);

    const updatedFeedback =
      alreadyIndex !== -1
        ? existing.map((f, i) => (i === alreadyIndex ? feedbackEntry : f)) // edit
        : [...existing, feedbackEntry]; // add new

    const updatedOrchid = { ...orchid, feedback: updatedFeedback };
    try {
      const response = await fetch(`${MOCK_API_URL}/${orchidId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrchid),
      });
      if (!response.ok) throw new Error('API Error');
      return await response.json();
    } catch {
      return rejectWithValue(updatedOrchid); // local fallback
    }
  }
);

// ─── Delete Feedback ─────────────────────────────────────────────────────────
export const deleteFeedback = createAsyncThunk(
  'orchids/deleteFeedback',
  async ({ orchidId, authorEmail }, { getState, rejectWithValue }) => {
    const orchid = getState().orchids.items.find((o) => String(o.id) === String(orchidId));
    if (!orchid) return rejectWithValue('Orchid not found');

    const updatedFeedback = (orchid.feedback || []).filter((f) => f.author !== authorEmail);
    const updatedOrchid = { ...orchid, feedback: updatedFeedback };
    try {
      const response = await fetch(`${MOCK_API_URL}/${orchidId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrchid),
      });
      if (!response.ok) throw new Error('API Error');
      return await response.json();
    } catch {
      return rejectWithValue(updatedOrchid);
    }
  }
);

// ─── Admin Reply to Feedback ──────────────────────────────────────────────────
// payload: { orchidId, authorEmail, replyText }
export const adminReply = createAsyncThunk(
  'orchids/adminReply',
  async ({ orchidId, authorEmail, replyText }, { getState, rejectWithValue }) => {
    const orchid = getState().orchids.items.find((o) => String(o.id) === String(orchidId));
    if (!orchid) return rejectWithValue('Orchid not found');

    const updatedFeedback = (orchid.feedback || []).map((f) =>
      f.author === authorEmail
        ? { ...f, adminReply: replyText.trim(), adminReplyDate: new Date().toISOString() }
        : f
    );
    const updatedOrchid = { ...orchid, feedback: updatedFeedback };

    try {
      const response = await fetch(`${MOCK_API_URL}/${orchidId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrchid),
      });
      if (!response.ok) throw new Error('API Error');
      return await response.json();
    } catch {
      return rejectWithValue(updatedOrchid);
    }
  }
);

// ─── Slice ───────────────────────────────────────────────────────────────────
const orchidsSlice = createSlice({
  name: 'orchids',
  initialState: {
    items: [],
    status: 'idle',
    submitting: false,
    feedbackSubmitting: false,
    replySubmitting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ── Fetch ─────────────────────────────────────────────────────────────
      .addCase(fetchOrchids.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchOrchids.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrchids.rejected, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        console.warn('Using local fallback data because MockAPI failed.');
      })

      // ── Add ───────────────────────────────────────────────────────────────
      .addCase(addOrchid.pending, (state) => { state.submitting = true; })
      .addCase(addOrchid.fulfilled, (state, action) => {
        state.submitting = false;
        state.items.unshift(action.payload); // thêm vào đầu danh sách
      })
      .addCase(addOrchid.rejected, (state, action) => {
        state.submitting = false;
        if (action.payload) state.items.unshift(action.payload); // thêm vào đầu danh sách
      })

      // ── Update ────────────────────────────────────────────────────────────
      .addCase(updateOrchid.pending, (state) => { state.submitting = true; })
      .addCase(updateOrchid.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.items.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateOrchid.rejected, (state, action) => {
        state.submitting = false;
        if (action.payload) {
          const idx = state.items.findIndex((i) => i.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
        }
      })

      // ── Delete ────────────────────────────────────────────────────────────
      .addCase(deleteOrchid.pending, (state) => { state.submitting = true; })
      .addCase(deleteOrchid.fulfilled, (state, action) => {
        state.submitting = false;
        state.items = state.items.filter((i) => i.id !== action.payload);
      })
      .addCase(deleteOrchid.rejected, (state, action) => {
        state.submitting = false;
        if (action.payload) state.items = state.items.filter((i) => i.id !== action.payload);
      })

      // ── Submit Feedback ───────────────────────────────────────────────────
      .addCase(submitFeedback.pending, (state) => { state.feedbackSubmitting = true; })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.feedbackSubmitting = false;
        const idx = state.items.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.feedbackSubmitting = false;
        if (action.payload && action.payload.id) {
          const idx = state.items.findIndex((i) => i.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
        }
      })

      // ── Delete Feedback ───────────────────────────────────────────────────
      .addCase(deleteFeedback.pending, (state) => { state.feedbackSubmitting = true; })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbackSubmitting = false;
        const idx = state.items.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.feedbackSubmitting = false;
        if (action.payload && action.payload.id) {
          const idx = state.items.findIndex((i) => i.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
        }
      })

      // ── Toggle Like ───────────────────────────────────────────────────────
      .addCase(toggleLike.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(toggleLike.rejected, (state, action) => {
        // Local fallback — still update UI
        if (action.payload && action.payload.id) {
          const idx = state.items.findIndex((i) => i.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
        }
      })

      // ── Admin Reply ───────────────────────────────────────────────────────
      .addCase(adminReply.pending, (state) => { state.replySubmitting = true; })
      .addCase(adminReply.fulfilled, (state, action) => {
        state.replySubmitting = false;
        const idx = state.items.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(adminReply.rejected, (state, action) => {
        state.replySubmitting = false;
        if (action.payload && action.payload.id) {
          const idx = state.items.findIndex((i) => i.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
        }
      });
  },
});

export default orchidsSlice.reducer;
