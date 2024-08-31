// SPDX-FileCopyrightText: (C) 2024 Hong Yongmin <https://revi.xyz/>
// SPDX-FileContributor: Microsoft Corporation
//
// SPDX-License-Identifier: Apache-2.0

import {test, expect} from '@playwright/test';

test('Has title', async ({page}) => {
  await page.goto('/privacy-policy/');

  // Expect the page to have a correct title.
  await expect(page).toHaveTitle(/개인정보 처리방침/);
  await page.getByRole('heading', {name: '개인정보 처리방침'}).click();
});

test('Desktop-Only: Click arbitrary section link from ToC', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Skipping desktop-only tests...');
  await page.goto('/privacy-policy/');

  // Click the (randomly selected) ToC link, and expect a page to be visible.
  await expect(page.getByText('1. 개인정보의 처리 목적2')).toBeVisible();
  await page
    .getByRole('link', {
      name: '9. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항',
      exact: true,
    })
    .click();
  await expect(page.getByRole('article')).toContainText(
    '쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.',
  );
});

test('Click arbitrary section link', async ({page}) => {
  await page.goto(
    '/privacy-policy/#9-개인정보-자동-수집-장치의-설치운영-및-거부에-관한-사항',
  );

  // Get the link for the section (selected above), and expect a page to be visible.
  await page.getByRole('heading', {name: '9'}).click();
  await expect(
    page.getByText(
      'ReviNet은 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다',
    ),
  ).toBeVisible();
  await expect(page.getByRole('article')).toContainText(
    '쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.',
  );
});

test('Desktop-Only: Click email obfuscator', async ({page, isMobile}) => {
  test.skip(isMobile, 'Skipping desktop-only tests...');
  await page.goto('/privacy-policy/');

  // Verify the email obfuscator works.
  await page
    .getByRole('link', {name: '11. 개인정보 열람청구', exact: true})
    .click();
  await page.getByText('이메일 주소 보기').click();
  // Check the box contents are as expected.
  await expect(
    page.getByText(
      '이 사이트 에 접속한 후, 다음 코드를 붙여넣고 우측 상단 노란색으로 강조된 "Run" 을 클릭하세요. (스팸메일 방지를 위한 대책입니다.) main.gopackage mainimport "fmt"func ReverseRunes(s string) string { r := []rune(s) for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 { r[i], r[j] = r[j], r[i] } return string(r)}func main() { fmt.Println(ReverseRunes("ved.iver@lagel"))} 하단에 정상적인 이메일 주소와 함께 Program exited. 라는 문구가 뜨면 됩니다. (예시 를 참조하세요. 이 코드는 go.dev 에서 발췌한 것으로 BSD 라이선스에 의해 배포됩니다.) 이 링크를 클릭하면 위 코드를 자동으로 채워 줍니다. 자동으로 채워진 경우 우측 상단 노란색 "Run"을 클릭하기만 하면 됩니다. 사이트가 동작하지 않거나 하는 경우, 맨 마지막 "v"로 시작하고 "l"로 끝나는 부분을 역순으로 조합하면 올바른 이메일 주소가 등장합니다',
    ),
  ).toBeVisible();
  await page.getByLabel('Copy code to clipboard').click();
  // Check the email address is as expected.
  await expect(page.locator('pre')).toContainText('ved.iver@lagel');
  // Check the footer message is as expected.
  await expect(page.getByRole('group')).toContainText(
    '올바른 이메일 주소가 등장합니다.',
  );
  await expect(
    page.getByText('하단에 정상적인 이메일 주소와 함께 Program'),
  ).toBeVisible();
});

test('Click email obfuscator', async ({page}) => {
  await page.goto('/privacy-policy/#11-개인정보-열람청구');

  // Verify the email obfuscator works.
  await page.getByLabel('Direct link to 11. 개인정보 열람청구').click();
  await page.getByText('이메일 주소 보기').click();
  // Check the box contents are as expected.
  await expect(
    page.getByText(
      '이 사이트 에 접속한 후, 다음 코드를 붙여넣고 우측 상단 노란색으로 강조된 "Run" 을 클릭하세요. (스팸메일 방지를 위한 대책입니다.) main.gopackage mainimport "fmt"func ReverseRunes(s string) string { r := []rune(s) for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 { r[i], r[j] = r[j], r[i] } return string(r)}func main() { fmt.Println(ReverseRunes("ved.iver@lagel"))} 하단에 정상적인 이메일 주소와 함께 Program exited. 라는 문구가 뜨면 됩니다. (예시 를 참조하세요. 이 코드는 go.dev 에서 발췌한 것으로 BSD 라이선스에 의해 배포됩니다.) 이 링크를 클릭하면 위 코드를 자동으로 채워 줍니다. 자동으로 채워진 경우 우측 상단 노란색 "Run"을 클릭하기만 하면 됩니다. 사이트가 동작하지 않거나 하는 경우, 맨 마지막 "v"로 시작하고 "l"로 끝나는 부분을 역순으로 조합하면 올바른 이메일 주소가 등장합니다',
    ),
  ).toBeVisible();
  await page.getByLabel('Copy code to clipboard').click();
  // Check the email address is as expected.
  await expect(page.locator('pre')).toContainText('ved.iver@lagel');
  // Check the footer message is as expected.
  await expect(page.getByRole('group')).toContainText(
    '올바른 이메일 주소가 등장합니다.',
  );
  await expect(
    page.getByText('하단에 정상적인 이메일 주소와 함께 Program'),
  ).toBeVisible();
});
