// Unit Test Runner for VAEL Core Utilities

import { createInvitation, getInvitation, updateInvitation, deleteInvitation } from './supabase.ts';
import { INVITATION_DESIGN_PRESETS } from '../data/invitationDesigns.ts';
import { songs, getSongById } from '../data/songs.ts';

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

export async function runVaelUnitTests(): Promise<TestResult[]> {
  const results: TestResult[] = [];

  // Test 1: Invitation CRUD operations in local/mock mode
  try {
    const testConfig = {
      design: 'noir',
      occasion: 'Wedding',
      name1: 'Karim',
      name2: 'Nour',
      date: '2026-11-14',
      time: '19:00',
      venueName: 'Al Nakheel Garden',
      city: 'New Cairo',
      language: 'both'
    };

    const { slug, token } = await createInvitation(testConfig);
    const fetched = await getInvitation(slug);

    const updated = await updateInvitation(slug, token, { ...testConfig, venueName: 'Updated Venue' });
    const fetchedUpdated = await getInvitation(slug);

    const deleted = await deleteInvitation(slug, token);
    const fetchedDeleted = await getInvitation(slug);

    const passed =
      Boolean(slug) &&
      Boolean(token) &&
      fetched !== null &&
      fetched.config.name1 === 'Karim' &&
      updated === true &&
      fetchedUpdated?.config.venueName === 'Updated Venue' &&
      deleted === true &&
      fetchedDeleted === null;

    results.push({ name: 'Invitation CRUD Lifecycle (Create, Get, Update, Delete)', passed });
  } catch (e: any) {
    results.push({ name: 'Invitation CRUD Lifecycle (Create, Get, Update, Delete)', passed: false, error: e.message });
  }

  // Test 2: Security Link Validation (reject non-https / javascript: maps links)
  try {
    const isValidGoogleMapsUrl = (url: string) => {
      if (!url) return true;
      return (
        url.startsWith('https://google.com/maps') ||
        url.startsWith('https://www.google.com/maps') ||
        url.startsWith('https://maps.app.goo.gl') ||
        url.startsWith('https://goo.gl/maps')
      );
    };

    const valid1 = isValidGoogleMapsUrl('https://maps.app.goo.gl/abc123xyz');
    const invalidScript = isValidGoogleMapsUrl('javascript:alert(1)');
    const invalidHttp = isValidGoogleMapsUrl('http://maps.app.goo.gl/test');

    const passed = valid1 && !invalidScript && !invalidHttp;
    results.push({ name: 'Security URL Filtering (reject non-https & javascript:)', passed });
  } catch (e: any) {
    results.push({ name: 'Security URL Filtering (reject non-https & javascript:)', passed: false, error: e.message });
  }

  // Test 3: Design Presets (Ivory, Noir, Oud, Azure, Textures)
  try {
    const ivory = INVITATION_DESIGN_PRESETS.ivory;
    const noir = INVITATION_DESIGN_PRESETS.noir;
    const oud = INVITATION_DESIGN_PRESETS.oud;
    const azure = INVITATION_DESIGN_PRESETS.azure;
    const silverDamask = INVITATION_DESIGN_PRESETS['silver-damask'];

    const passed =
      ivory?.ritual === 'wax-seal' &&
      noir?.ritual === 'obsidian-shatter' &&
      oud?.ritual === 'gold-calligraphy' &&
      azure?.id === 'azure' &&
      silverDamask?.bgImage === '/backgrounds/silver-damask.jpg' &&
      Object.keys(INVITATION_DESIGN_PRESETS).length >= 7;

    results.push({ name: 'Design Presets (Ivory, Noir, Oud, Azure & Textures)', passed });
  } catch (e: any) {
    results.push({ name: 'Design Presets (Ivory, Noir, Oud, Azure & Textures)', passed: false, error: e.message });
  }

  // Test 4: Songs Registry Structure
  try {
    const found = getSongById('non-existent-id');
    const passed = Array.isArray(songs) && found === undefined;
    results.push({ name: 'Songs Registry Plumbing', passed });
  } catch (e: any) {
    results.push({ name: 'Songs Registry Plumbing', passed: false, error: e.message });
  }

  return results;
}

// Auto-run if executed directly via Node
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('testRunner')) {
  runVaelUnitTests().then((res) => {
    console.log('--- VAEL Unit Test Results ---');
    res.forEach((r) => {
      console.log(`${r.passed ? '✓ PASS' : '✗ FAIL'}: ${r.name} ${r.error ? `(${r.error})` : ''}`);
    });
  });
}
