module.exports = {
	'accessKey' : process.env.S3_KEY,
	'secretAccessKey' : process.env.S3_SECRET,
	'googleProjectID' : process.env.GOOGLE_PROJECT_ID,
	'googleClientEmail' : process.env.GOOGLE_CLIENT_EMAIL,
	'googlePrivateKey' : "-----BEGIN PRIVATE KEY-----\n" + process.env.GOOGLE_KEY_SUBSET + "\nw1Aisc7SuhP/87Z+gLKujsJECpXdvNSY9qQOanX69vebqsxMuA5FfCWYF7zuaT0Z\nVAtTuamkCwGHhwd7rCj9VgCePs4PHvZbqOVTIotr7/qxAQNHgnHoWAWzf6yPccaA\nwp0VBbPTOUcpfdsPH3wvuclxFXxFMVuzbB+CsS6PE1c2mkAHhEgKTK0Fm7yEeGO/\nG5YbfAYz6N3IyuR8Qnj7phJSnKpa0Q8xs6ESx96BfyDzdwpMmLY/yI+illrMp3YD\nuupVlRMk2QE3ua1d3eB2HIWL6a4d0kdOmLPUJ5uYhhTTGFtEIQAW3/E+/dCNz7E8\niGO/FKNRAgMBAAECggEAaxL5M1zdFK0o1/giS60ChOrPz41fb1xsQ+RUpzSMIV/x\nPQ6OwqSS4PADOyuMfP8ag7e0j2ST3lsplxSF2CPGlYe5iHsDTruaXbhJTYCgBcly\neDUBS5Z9bBrMo0dhj1kxYej6+LJag5Vlvua4CAKK2SIMdVspnIEl/r/9nauCrksV\n4UqTL6F9oyZeKhbw8xGG9Yw4xuUkuNP4cnJ09gOHsyKGFxnd9XRLWVcPV45LTlIO\nluEVG+nxWQ0M7MOgo+RFjr1mxN/8lxsZ/Tce/5L+9KQUdgt0rSfr9Hwt2ItIwyaP\nbPrHIULgcM4EgnF1arJjOS6hi/Ez9G9zke5c7NTEQQKBgQDhZw45KO3ySjaZ1BbH\n1dCbWqS0b7M6CPgdDvh2zAieGSVAwU1pqcmnwXF/IJ1qX3wa9k8y+A2arzKjwPEp\noPOrEPZV2xDD9iXtC6LHCA7tsMeRsA63P9tKWWdpYnJDpEDypGSrvU3UarzD6Gju\nF0HqJLHJLIqGYkVHDpL9yXdzWQKBgQDbNj815QNsASAEXWMCR91NbJDEiRuVNJVb\nFW1ABVZ7queZjbKFd2CGuBRdA+vk+AUXqDtUh83Edz7Abcka3r5yCrpUvtzepPAB\nTW1Fx3Nw4An20gDU8s6/Zj0YlHU3hWUQrW09w8NzxSDoTuPXwEZqyhv/vE1PTHZ+\ns8HvPfOIuQKBgAiBZAcCJWB0LnVFjIqD5fhGxlpMsL2q4vntu7B36IdWuZIk+S/Y\niVR8NzUt3OLLsZou2zQ4KgNBQy7ss+z3NtqorDL3Lj3Gxw2X18+c3TtY5V74/sUp\ncrPuhblzTo6A3zaIv4e/f/VZBcB6v6LkW8djFRZbSOrjQGv6/8710D0ZAoGAPXfr\np6gtGncCTFcHcVdHdfNwcLvlkSQqkVzjwqT8iDb3NHaoTYaY+Y3an+5+kjj97JFO\n+bgO+f1aCkl+r9sv2fiqISNX+dKUPjlA3+U6uLcJ9D0U4KGpWcBId4EBkW0FVvTa\nggxH3Um0nY+pkhEnbcB4s3BQ2WCehY7QXc6oYHkCgYBRsunFfOWdnxwEC6c/5SB8\nKvcmUgJ/ngmKteMYmw2HsdtFrvNH+7tkWNdxdidFE6QyM192dG6/cRG8rfA60kYm\nqEYAJg6g1WuwiyXwPnVyBZDHvKw3vtYq6qiwvgmgmlkT/0p0/ufo1u/T1ql31c+x\nNtQ0ptAqZWvsis+5X4y17A==\n-----END PRIVATE KEY-----\n",
	'database' : process.env.DATABASE_URL,
	'authGoogleClientId': process.env.AUTH_GOOGLE_ID,
	'authGoogleSecret': process.env.AUTH_GOOGLE_SECRET,
	'authGoogleCallback': 'http://localhost:5000/auth/google/callback'
};