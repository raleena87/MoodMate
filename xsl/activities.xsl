<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/activities">
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Activities | MoodMate</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
    <style>
        :root {
            --primary-color: #6c63ff;
            --primary-dark: #554fd8;
            --primary-light: #eeecff;
            --secondary-color: #ff8a65;
            --text-dark: #25263a;
            --text-medium: #5c5f73;
            --background-color: #f7f8fc;
            --surface-color: #ffffff;
            --border-color: #dedfea;
            --radius-medium: 14px;
            --radius-round: 999px;
            --shadow-small: 0 4px 14px rgba(37, 38, 58, 0.08);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: "Inter", Arial, sans-serif;
            background-color: var(--background-color);
            color: var(--text-dark);
            padding: 50px 24px 80px;
        }
        h1 {
            font-family: "Poppins", Arial, sans-serif;
            text-align: center;
            font-size: 2.6rem;
            margin-bottom: 10px;
        }
        .subtitle {
            text-align: center;
            color: var(--text-medium);
            margin-bottom: 40px;
        }
        .grid {
            max-width: 1180px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 22px;
        }
        .card {
            background-color: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-medium);
            box-shadow: var(--shadow-small);
            padding: 22px;
        }
        .card-id {
            color: var(--primary-color);
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }
        .card-name {
            font-family: "Poppins", Arial, sans-serif;
            font-size: 1.25rem;
            margin-bottom: 10px;
        }
        .card-desc {
            color: var(--text-medium);
            margin-bottom: 16px;
            font-size: 0.95rem;
        }
        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .tag {
            background-color: var(--primary-light);
            color: var(--primary-dark);
            font-size: 0.8rem;
            font-weight: 600;
            padding: 5px 11px;
            border-radius: var(--radius-round);
        }
        .tag.secondary {
            background-color: #fff0eb;
            color: #c9603c;
        }
    </style>
</head>
<body>
    <h1>Activities</h1>
    <p class="subtitle">
        <xsl:value-of select="count(activity)"/> activities transformed directly from activities.xml via XSLT
    </p>

    <div class="grid">
        <xsl:for-each select="activity">
        <div class="card">
            <div class="card-id"><xsl:value-of select="id"/></div>
            <div class="card-name"><xsl:value-of select="name"/></div>
            <div class="card-desc"><xsl:value-of select="description"/></div>
            <div class="tags">
                <span class="tag"><xsl:value-of select="mood"/></span>
                <span class="tag secondary"><xsl:value-of select="category"/></span>
                <span class="tag"><xsl:value-of select="location"/></span>
                <span class="tag secondary"><xsl:value-of select="energy"/></span>
                <span class="tag"><xsl:value-of select="duration"/></span>
            </div>
        </div>
        </xsl:for-each>
    </div>
</body>
</html>
</xsl:template>

</xsl:stylesheet>
