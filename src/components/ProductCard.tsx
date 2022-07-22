import React, { FC } from 'react';
import { Producto } from '../interfaces/ProductsInterface';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { UpdateProductModal } from './UpdateProductModal';
import { CreateProductModal } from './CreateProductModal';
import { Tooltip } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface Props {
    product: Producto;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));




function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <>
            <Grid item xs={12} sm={6} lg={3} xl={2}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        // avatar={
                        //     <Avatar aria-label="recipe" {...stringAvatar(product.nombre)} />
                        // }
                        action={
                            <IconButton aria-label="cargar imagen">
                                <Tooltip title="Cargar imagen">
                                    <FileUploadIcon />
                                </Tooltip>
                            </IconButton>
                        }
                        title={product.nombre}
                        titleTypographyProps={{ variant: 'h6' }}
                        subheader={'$' + product.precio}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={product.img || 'https://source.unsplash.com/random'}
                        alt={product.nombre}

                    />
                    <CardActions disableSpacing sx={{
                        justifyContent: 'space-between',
                    }}>

                        <Button size="small" onClick={handleClickOpen}>Editar</Button>
                        <Button size="small">Eliminar</Button>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    alignItems: 'center',

                                }}>
                                    <CategoryOutlinedIcon sx={{ fontSize: 20, marginRight: 1 }} />

                                    <Typography component="p">
                                        Categoría:
                                    </Typography>
                                    <Box sx={{
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        marginTop: 'auto',
                                        marginBottom: 'auto',
                                    }}> </Box>
                                    <Typography variant="subtitle1" component="p">
                                        {product.categoria.nombre}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{
                                    display: 'flex',
                                    alignItems: 'center',

                                }}>
                                    <InsertEmoticonOutlinedIcon sx={{ fontSize: 20, marginRight: 1 }} />
                                    <Typography component="p">
                                        Creador por:
                                    </Typography>
                                    <Box sx={{
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        marginTop: 'auto',
                                        marginBottom: 'auto',
                                    }}> </Box>
                                    <Typography variant="subtitle1" component="p">
                                        {product.usuario.nombre}
                                    </Typography>
                                </Grid>

                            </Grid>

                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
            <UpdateProductModal open={open} handleClose={handleClose} product={product} />

        </>
    )
}
