import { render, screen } from '@testing-library/svelte';
import { afterEach, expect, it, vi } from 'vitest';
import AgentList from '$components/AgentList.svelte';
import { setHomeLayout } from '$lib/preferences';
import type { Agent, RelayWorkspace } from '$lib/types';

afterEach(() => setHomeLayout('mixed'));

it('orders workspaces like the Herdr sidebar, not by recent activity', () => {
  setHomeLayout('herdr');
  const relays = [{ id: 'mac', label: 'Mac', url: '', token: '' }];
  const names = ['alpha', 'bravo', 'charlie'];
  const workspaces = names.map((label, index): RelayWorkspace => ({
    relay_id: 'mac', relay_label: 'Mac', workspace_id: `w${index}`, number: 10 - index, label,
    focused: false, pane_count: 1, tab_count: 1, active_tab_id: '', agent_status: '', cwd: `/${label}`, worktree: null,
  }));
  // charlie was active most recently, alpha least: activity order would be reversed.
  const agents = names.map((label, index): Agent => ({
    relay_id: 'mac', relay_label: 'Mac', raw_pane_id: `w${index}:p1`, pane_id: `mac::w${index}:p1`,
    workspace_id: `w${index}`, project: label, agent: 'omp', status: 'idle', last_active_at: 1000 + index,
  }));
  render(AgentList, { agents, workspaces, relays, responding: new Set<string>(), onopen: vi.fn() });
  const order = screen.getAllByText(/^(alpha|bravo|charlie)$/).map((node) => node.textContent);
  expect([...new Set(order)]).toEqual(names);
});
