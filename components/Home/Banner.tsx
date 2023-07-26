import { useSiteConfig } from '@/hooks/useSiteConfig';
import { dateIsBetween } from '@/util/dateIsBetween';

const Banner = () => {
  const siteConfig = useSiteConfig();

  // Note.: This is hardcoded and going to be replaced by the `nodejs/nodejs.dev` codebase
  if (siteConfig.websiteBanners && siteConfig.websiteBanners['index']) {
    const indexBanner = siteConfig.websiteBanners['index'];

    const showBanner = dateIsBetween(
      indexBanner.startDate,
      indexBanner.endDate
    );

    if (showBanner && indexBanner.text) {
      return (
        <p className="home-version home-version-banner">
          <a href={indexBanner.link}>{indexBanner.text}</a>
        </p>
      );
    }

    if (showBanner && indexBanner.html) {
      return (
        <a
          href={indexBanner.link}
          dangerouslySetInnerHTML={{ __html: indexBanner.html }}
        />
      );
    }
  }

  return null;
};

export default Banner;
