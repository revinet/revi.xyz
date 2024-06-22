import {test, expect} from '@playwright/test';

test('Has blog/2022/01/28/오픈카톡/ page', async ({page}) => {
  // Go to the blog post page.
  await page.goto('https://revi.xyz/blog/2022/01/28/오픈카톡/');

  // Expect the title to be there.
  await expect(page).toHaveTitle(/오픈카톡/);
  // Expect image to be there.
  await expect(
    page.getByRole('img', {
      name: '오픈카톡 최근 메시지가 아닌 메시지, 인용구 아래 작성',
    }),
  ).toBeVisible();
  // Expect the quoted text to be there.
  await expect(page.getByRole('blockquote')).toContainText(
    '대화내용 저장이 필요하신 경우 미리 [오픈채팅방 내부 우상단 메뉴(≣) > 우하단 톱니바퀴 > 대화 내용 내보내기] 기능을 이용해주세요.',
  );
  // Click the link
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', {name: '출처'}).click();
  const page1 = await page1Promise;
  // Verify you landed to the right page.
  await page1
    .getByText('현재 오픈채팅은 백업/복원을 지원하지 않고 있습니다')
    .click();
});

test('Has blog/2024/02/16/uplus-tv-uhd3-dns-over-tls/ page', async ({page}) => {
  // Go to the blog post page.
  await page.goto(
    'https://revi.xyz/blog/2024/02/16/uplus-tv-uhd3-dns-over-tls/',
  );

  // Expect the title to be there.
  await expect(page).toHaveTitle(/U\+TV UHD3 DNS Over TLS/);

  // Expect the text to be there.
  await expect(
    page.getByText(
      'adb shell settings put global private_dns_specifier $HOSTNAME',
    ),
  ).toBeVisible();
  // Verify `adb shell settings put global private_dns_mode hostname` is there.
  await expect(page.locator('[id="__blog-post-container"]')).toContainText(
    'adb shell settings put global private_dns_mode hostname',
  );
  // Click the footnote link
  await page.getByRole('link', {name: '1', exact: true}).click();
  // Verify the footnote is there.
  await expect(page.getByText('hostname 원문 그대로 쳐야 함.')).toBeVisible();
});
