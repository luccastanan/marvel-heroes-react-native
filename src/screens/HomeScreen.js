import React, {useState, useEffect} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Image from 'react-native-scalable-image';
import {Menu, Button, Searchbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

import {Container, Label} from '../components';
import {RED} from '../constants/colors';
import * as heroesActions from '../actions/heroes';

const LIMITS = [5, 10, 20];

const HomeScreen = props => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [visibleLimit, setVisibleLimit] = useState(false);
    const [selectedHeroIndex, setSelectedHeroIndex] = useState(-1);

    useEffect(() => {
        if (props.heroes.characters.length === 0) {
            props.fetchHeroes();
        }
    }, [props.heroes.characters]);

    useEffect(() => {
        props.filterHeroes(search);
        setPage(0);
    }, [search]);

    /**
     * Retorna quantidade de página possíveis
     */
    function calcPages() {
        return Math.ceil(getData().length / limit);
    }

    /**
     * Volta uma página, se possível
     */
    function handlePrev() {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    /**
     * Avança uma página, se possível
     */
    function handleNext() {
        if (page + 1 < calcPages()) {
            setPage(page + 1);
        }
    }

    /**
     * Retona a lista de heróis
     */
    function getData() {
        return props.heroes.isFiltering
            ? props.heroes.filteredCharacters
            : props.heroes.characters;
    }

    /**
     * Retona a lista de heróis da página
     */
    function getDateByPage() {
        return getData().slice(limit * page, limit * page + limit);
    }

    function renderHero(hero, index) {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => setSelectedHeroIndex(index + page * limit)}>
                <Image
                    width={60}
                    source={{uri: hero.imageURI}}
                    style={styles.itemImage}
                />
                <Label size={20}>{hero.name}</Label>
            </TouchableOpacity>
        );
    }

    function renderEmptyComponent() {
        return (
            <View style={styles.containerEmtpy}>
                <Label type={'bold'} color={RED}>
                    NENHUM HERÓI ENCONTRATO
                </Label>
            </View>
        );
    }

    function renderLoading() {
        return (
            <View style={styles.containerEmtpy}>
                <ActivityIndicator color={RED} size={'large'} />
            </View>
        );
    }

    function handleLimit(limit) {
        setLimit(limit);
        setVisibleLimit(false);
    }

    function renderHeader() {
        return (
            <View style={styles.containerHeader}>
                <View>
                    <Menu
                        visible={visibleLimit}
                        onDismiss={() => setVisibleLimit(false)}
                        anchor={
                            <Button
                                labelStyle={{color: 'white'}} onPress={() => setVisibleLimit(true)}>Limite {limit} <Icon name={'caretdown'} size={15} color={'white'} /></Button>
                        }    
                    >   
                        {LIMITS.map(limit => <Menu.Item key={limit.toString()} onPress={() => handleLimit(limit)} title={limit}/>)}
                    </Menu>
                </View>
            </View>
        );
    }

    function renderPagination() {
        return (
            <View style={styles.containerPagination}>
                {renderPaginationBtn('caretleft', () => handlePrev())}
                <FlatList
                    horizontal
                    data={Array.from(Array(calcPages()).keys()).map(n => ({
                        num: n + 1,
                    }))}
                    renderItem={({item, index}) => renderPaginationNumber(item, index === page)}
                    keyExtractor={item => item.num.toString()}
                    ItemSeparatorComponent={() => <View style={{width: 18}} />}
                    style={{flexGrow: 0}}
                />
                {renderPaginationBtn('caretright', () => handleNext())}
            </View>
        );
    }

    function renderPaginationNumber(item, current) {
        return (
            <TouchableOpacity
                style={current ? styles.currentPagination : styles.pagination}
                onPress={() => setPage(item.num - 1)}>
                <Label color={current ? 'white' : RED}>{item.num}</Label>
            </TouchableOpacity>
        );
    }

    function renderPaginationBtn(icon, onPress) {
        return (
            <TouchableOpacity onPress={onPress} style={{marginHorizontal: 10}}>
                <Icon name={icon} size={30} color={RED} />
            </TouchableOpacity>
        );
    }

    function renderModalHero() {
        const hero = getData()[selectedHeroIndex];
        return (
            <>
                <Image width={250} source={{uri: hero.imageURI}} />
                <Label
                    color={'white'}
                    type={'bold'}
                    size={30}
                    style={{marginTop: 10, textAlign: 'center'}}>
                    {hero.name.toUpperCase()}
                </Label>
            </>
        );
    }

    function renderModal() {
        return (
            <Modal
                isVisible={selectedHeroIndex >= 0}
                backdropOpacity={0.9}
                onBackdropPress={() => setSelectedHeroIndex(-1)}
                onBackButtonPress={() => setSelectedHeroIndex(-1)}>
                <View style={{flex: 1}}>
                    <TouchableOpacity
                        onPress={() => setSelectedHeroIndex(-1)}
                        style={{alignSelf: 'flex-end'}}>
                        <Icon name="close" color="white" size={30} />
                    </TouchableOpacity>
                    <View
                        style={styles.modalHero}>
                        {selectedHeroIndex >= 0 && renderModalHero()}
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <Container>
            <Searchbar 
                placeholder={'Nome do personagem'} 
                value={search}
                onChangeText={text => setSearch(text)}
                style={styles.search}
                iconColor={RED}
            />
            {props.heroes.isFetching || (props.heroes.isFiltering && props.heroes.filteredCharacters.length === 0) || 
                renderHeader()
            }
            <FlatList
                data={getDateByPage()}
                renderItem={({item, index}) => renderHero(item, index)}
                keyExtractor={item => item.name}
                ListEmptyComponent={
                    props.heroes.isFetching
                        ? renderLoading()
                        : renderEmptyComponent()
                }
            />
            {getData().length == 0 || props.isFetching || renderPagination()}
            {renderModal()}
        </Container>
    );
};

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: RED,
        flexDirection: 'row',
    },
    itemImage: {
        borderRadius: 30,
        marginEnd: 18,
    },
    containerHeader: {
        backgroundColor: RED,
        paddingStart: 96,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    containerEmtpy: {
        width: '100%',
        alignItems: 'center',
        marginTop: 18,
    },
    containerPagination: {
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 18,
        flexDirection: 'row',
    },
    pagination: {
        borderWidth: 1,
        borderColor: RED,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentPagination: {
        backgroundColor: RED,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        marginHorizontal: 18,
        marginBottom: 18,
    },
    modalHero: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    heroes: state.heroes,
});

const mapDispatchToProps = dispatch => bindActionCreators(heroesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
