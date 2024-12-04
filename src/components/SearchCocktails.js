import React, { useState, useCallback, useMemo } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, InputAdornment, List, ListItem, Chip, Fade, Alert } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import VibrationIcon from '@mui/icons-material/Vibration';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { GlassWater, Wine, Martini, Coffee } from 'lucide-react';
import { cocktailOptions, fetchData } from '../utils/fetchData';

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(to right, #E3867D, #962E2A)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  backgroundColor: 'transparent',
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    border: '1px solid rgba(227, 134, 125, 0.1)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    backgroundColor: 'transparent !important',
    '& input': {
      backgroundColor: 'transparent !important',
    },
    '& fieldset': {
      border: 'none',
      backgroundColor: 'transparent !important',
    },
    '&:hover': {
      border: '1px solid rgba(227, 134, 125, 0.3)',
      boxShadow: '0 0 20px rgba(227, 134, 125, 0.1)',
    },
    '&.Mui-focused': {
      border: '1px solid #E3867D',
      boxShadow: '0 0 30px rgba(227, 134, 125, 0.2)',
      backgroundColor: 'transparent !important',
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
    backgroundColor: 'transparent !important'
  },
  '& .MuiInputBase-input': {
    backgroundColor: 'transparent !important',
  },
  '& input::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
  }
}));

const SearchButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #E3867D, #962E2A)',
  color: 'white',
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(227, 134, 125, 0.2)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    background: 'linear-gradient(45deg, #962E2A, #E3867D)',
    transform: 'translateY(-2px)',
    boxShadow: '0 0 30px rgba(227, 134, 125, 0.3)',
  },
  '&:disabled': {
    background: 'linear-gradient(45deg, #666, #888)',
    cursor: 'not-allowed',
  }
}));

const CocktailCard = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: alpha('#1A1A1A', 0.4),
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  border: '1px solid rgba(227, 134, 125, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(227, 134, 125, 0.15)',
    border: '1px solid rgba(227, 134, 125, 0.3)',
  }
}));

const StyledChip = styled(Chip)(({ theme, variant }) => ({
  backgroundColor: variant === 'filled' ? alpha('#E3867D', 0.1) : 'transparent',
  border: '1px solid rgba(227, 134, 125, 0.3)',
  borderRadius: '8px',
  color: '#E3867D',
  '& .MuiChip-icon': {
    color: '#E3867D',
  }
}));

const ScrollableResults = styled(Box)(({ theme }) => ({
  height: '280px',
  overflowY: 'auto',
  paddingRight: '8px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: alpha('#1A1A1A', 0.2),
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: alpha('#E3867D', 0.3),
    borderRadius: '4px',
    '&:hover': {
      background: alpha('#E3867D', 0.5),
    },
  }
}));

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const utils = useMemo(() => ({
    roundToNearest5: (num) => {
      return Math.round(num / 5) * 5;
    },

    parseFraction: (str) => {
      const mixedMatch = str.match(/(\d+)\s+(\d+)\/(\d+)/);
      if (mixedMatch) {
        const whole = parseInt(mixedMatch[1]);
        const num = parseInt(mixedMatch[2]);
        const den = parseInt(mixedMatch[3]);
        return whole + (num / den);
      }

      const fractionMatch = str.match(/(\d+)\/(\d+)/);
      if (fractionMatch) {
        return parseInt(fractionMatch[1]) / parseInt(fractionMatch[2]);
      }

      return parseFloat(str);
    },

    convertToMetric: (ingredient) => {
      const conversions = [
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*(?:ml|milliliter|millilitre)s?\b/i,
          convert: (val) => {
            const ml = utils.parseFraction(val);
            if (ml < 5) {
              return `${Math.round(ml)} ml`;
            }
            return `${utils.roundToNearest5(ml)} ml`;
          }
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*(?:oz|ounce|fl oz|fluid ounce|fl|fluid)s?\b/i,
          convert: (val) => {
            const ml = utils.parseFraction(val) * 29.5735;
            return `${utils.roundToNearest5(ml)} ml`;
          }
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*quarters?\b/i,
          convert: (val) => `${utils.roundToNearest5(utils.parseFraction(val) * 7.4)} ml`
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*(?:cl|centiliter|centilitre)s?\b/i,
          convert: (val) => `${utils.roundToNearest5(utils.parseFraction(val) * 10)} ml`
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*(?:tsp|teaspoon)s?\b/i,
          convert: (val) => `${utils.roundToNearest5(utils.parseFraction(val) * 5)} ml`
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*(?:tbsp|tbl|tablespoon)s?\b/i,
          convert: (val) => `${utils.roundToNearest5(utils.parseFraction(val) * 15)} ml`
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*cups?\b/i,
          convert: (val) => `${utils.roundToNearest5(utils.parseFraction(val) * 240)} ml`
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*jiggers?\b/i,
          convert: (val) => `${utils.roundToNearest5(utils.parseFraction(val) * 44.36)} ml`
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*shots?\b/i,
          convert: (val) => `${utils.roundToNearest5(utils.parseFraction(val) * 44.36)} ml`
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*(?:part|pts?)s?\b/i,
          convert: (val) => `${utils.parseFraction(val)} part`
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*dash(es)?\b/i,
          convert: (val) => {
            const num = Math.round(utils.parseFraction(val));
            return `${num} ${num === 1 ? 'dash' : 'dashes'}`;
          }
        },
        {
          pattern: /(\d+(?:\s+\d+\/\d+|\.\d+)?|\d+\/\d+)\s*drops?\b/i,
          convert: (val) => {
            const num = Math.round(utils.parseFraction(val));
            return `${num} ${num === 1 ? 'drop' : 'drops'}`;
          }
        }
      ];

      let result = ingredient.toLowerCase();
      
      conversions.forEach(({ pattern, convert }) => {
        result = result.replace(pattern, (match, amount) => convert(amount));
      });

      return result.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    },

    capitalizeWords: (str) => {
      return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    },

    needsShaking: (ingredients) => {
      const shakingIndicators = ['juice', 'cream', 'egg', 'dairy', 'syrup'];
      return ingredients.some(ingredient => 
        shakingIndicators.some(indicator => 
          ingredient.toLowerCase().includes(indicator)
        )
      );
    },

    getGlassIcon: (glassType) => {
      switch (glassType.toLowerCase()) {
        case 'martini glass':
          return <Martini />;
        case 'highball glass':
          return <GlassWater />;
        case 'coupe glass':
          return <Wine />;
        case 'old-fashioned glass':
          return <Coffee />;
        case 'collins glass':
          return <GlassWater />;
        case 'rocks glass':
          return <Coffee />;
        default:
          return <Coffee />;
      }
    },

    determineGlass: (cocktail) => {
      const name = cocktail.name.toLowerCase();
      const ingredients = cocktail.ingredients.join(' ').toLowerCase();
      
      if (name.includes('martini') || ingredients.includes('vermouth')) {
        return 'Martini Glass';
      } else if (name.includes('highball') || 
                (ingredients.includes('soda') && !ingredients.includes('cream soda'))) {
        return 'Highball Glass';
      } else if (name.includes('daiquiri') || 
                name.includes('gimlet') || 
                name.includes('manhattan')) {
        return 'Coupe Glass';
      } else if (name.includes('old fashioned') || 
                name.includes('negroni') || 
                name.includes('sazerac')) {
        return 'Old-Fashioned Glass';
      } else if (name.includes('collins') || 
                name.includes('mojito') || 
                name.includes('fizz')) {
        return 'Collins Glass';
      } else if (name.includes('whiskey') || 
                name.includes('rocks') || 
                name.includes('neat')) {
        return 'Rocks Glass';
      }
      
      if (ingredients.includes('tonic') || ingredients.includes('soda')) {
        return 'Highball Glass';
      } else if (ingredients.includes('whiskey') || ingredients.includes('bourbon')) {
        return 'Rocks Glass';
      } else if (ingredients.includes('vermouth') || ingredients.includes('liqueur')) {
        return 'Coupe Glass';
      }
      
      return 'Rocks Glass';
    }
  }), []);

  const handleSearch = useCallback(async () => {
    if (searchTerm.trim() === '') return;
    setIsLoading(true);
    setNoResults(false);
    try {
      const url = `https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?name=${encodeURIComponent(searchTerm)}`;
      const data = await fetchData(url, cocktailOptions);
      
      if (data.length === 0) {
        setNoResults(true);
        setSearchResults([]);
      } else {
        const enhancedData = data.map(cocktail => ({
          ...cocktail,
          name: utils.capitalizeWords(cocktail.name),
          needsShaking: utils.needsShaking(cocktail.ingredients),
          glass: utils.determineGlass(cocktail),
          ingredients: cocktail.ingredients.map(utils.convertToMetric)
        }));
        setSearchResults(enhancedData);
      }
    } catch (error) {
      console.error('Error:', error);
      setSearchResults([]);
      setNoResults(true);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, utils]);

  return (
    <Box 
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Container maxWidth="lg" sx={{ margin: '0 auto' }}>
        <Box 
          sx={{
            border: '1px solid rgba(227, 134, 125, 0.3)',
            borderRadius: '16px',
            p: 3,
            backgroundColor: alpha('#1A1A1A', 0.3),
            backdropFilter: 'blur(10px)',
            maxWidth: '1000px',
            width: '100%',
            margin: '0 auto',
            maxHeight: '610px',
            overflow: 'hidden'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 3, md: 0 } }}>
                <GradientText 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.75rem', sm: '2rem' },
                    fontWeight: 700,
                    mb: 1,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Discover Perfect Cocktails
                </GradientText>
                <Typography 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                    mb: 2
                  }}
                >
                  Explore our curated collection of premium cocktail recipes
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  gap: 2, 
                  mb: 2 
                }}>
                  <SearchInput
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search for a cocktail..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#E3867D' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <SearchButton
                    onClick={handleSearch}
                    disabled={isLoading}
                    sx={{ 
                      minWidth: { xs: '100%', sm: '120px' }
                    }}
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </SearchButton>
                </Box>

                {!searchResults.length && !noResults && !isLoading && (
                  <Box sx={{ 
                    p: 2,
                    bgcolor: alpha('#1A1A1A', 0.2),
                    borderRadius: '12px',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LightbulbIcon sx={{ color: '#E3867D' }} />
                      <Typography sx={{ color: '#E3867D', fontWeight: 600, fontSize: '0.9rem' }}>
                        Pro Tips
                      </Typography>
                    </Box>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
                      Try searching for classic cocktails like "Martini", "Margarita", or "Old Fashioned"
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {noResults && (
                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 2,
                    borderRadius: '12px',
                    bgcolor: alpha('#1A1A1A', 0.2),
                    color: '#E3867D',
                    py: 1,
                    fontSize: '0.85rem'
                  }}
                >
                  No cocktails found. Try a different search term.
                </Alert>
              )}

              <Fade in={searchResults.length > 0}>
                <ScrollableResults>
                  <List sx={{ p: 0 }}>
                    {searchResults.map((cocktail, index) => (
                      <CocktailCard key={index}>
                        <Box sx={{ width: '100%' }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: '#E3867D',
                              fontWeight: 600,
                              fontSize: '1rem',
                              mb: 1
                            }}
                          >
                            {cocktail.name}
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'flex', 
                            gap: 1,
                            mb: 1.5
                          }}>
                            <StyledChip
                              icon={cocktail.needsShaking ? <VibrationIcon /> : <DoNotDisturbIcon />}
                              label={cocktail.needsShaking ? "Shake" : "Stir"}
                              variant={cocktail.needsShaking ? "filled" : "outlined"}
                              size="small"
                            />
                            <StyledChip
                              icon={utils.getGlassIcon(cocktail.glass)}
                              label={cocktail.glass}
                              variant="filled"
                              size="small"
                            />
                          </Box>

                          <Typography 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontSize: '0.85rem'
                            }}
                          >
                            <strong>Ingredients:</strong><br />
                            {cocktail.ingredients.join(' • ')}
                          </Typography>
                        </Box>
                      </CocktailCard>
                    ))}
                  </List>
                </ScrollableResults>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchPage;